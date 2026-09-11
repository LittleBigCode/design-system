"use client"

import * as React from "react"
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { DotsSixVerticalIcon } from "@phosphor-icons/react"

import { useControllableValue } from "../hooks/useControllableValue.js"
import { cx } from "../lib/cx.js"

/* ----------------------------------------------------------------------------
   Kanban — batch 8's third defect swap, and the one that buys the migration's
   entire new dependency bill (@dnd-kit/core + /sortable + /utilities).

   0.11's board was 49 lines of HTML5 drag-and-drop with zero ARIA and no
   keyboard path at all: a card could only ever be moved with a mouse. That is
   not something an `onKeyDown` fixes. Accessible drag-and-drop is a
   lift/move/drop state machine with live regions announcing each transition,
   which is what @dnd-kit implements and why this is the one component in the
   absorption worth a dependency.

   The grip is a real <button>, so it is in the tab order; Space lifts, arrows
   move, Space drops, Escape cancels. site/tests/kanban-regress.spec.ts pins all
   five behaviours, three of them by keyboard.
   ---------------------------------------------------------------------------- */

type KanbanColumn = {
  id: string
  title: React.ReactNode
}

type KanbanItem = {
  column: string
  id?: string | number
  title?: React.ReactNode
}

function KanbanCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kanban-card-title"
      className={cx("ds-kanban-card-title", className)}
      {...props}
    />
  )
}

/**
 * Both the cards and the column bodies publish their `columnId` through
 * dnd-kit's `data`, so a drop resolves the same way whether it landed on a
 * sibling card or on the empty space of a column that has none.
 *
 * Deliberately no `DragOverlay`: an overlay changes where dnd-kit sources its
 * collision rect, which stops the keyboard sensor from finding any droppable in
 * the arrow direction — cards then only ever move by pointer. The carried card
 * is the real node, so it re-parents into the column it is dragged over.
 */
function KanbanCard({
  id,
  columnId,
  label,
  children,
}: {
  id: string
  columnId: string
  label: string
  children: React.ReactNode
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: { columnId },
    // The built-in `ease` is too soft for cards shuffling to make room. dnd-kit
    // drops the transition on the carried card itself, so this only ever times
    // the siblings — the dragged card still tracks the pointer 1:1.
    transition: { duration: 200, easing: "cubic-bezier(0.23, 1, 0.32, 1)" },
  })

  return (
    <div
      ref={setNodeRef}
      data-slot="kanban-card"
      style={{
        transform: transform
          ? CSS.Transform.toString({
              ...transform,
              scaleX: isDragging ? 1.02 : 1,
              scaleY: isDragging ? 1.02 : 1,
            })
          : undefined,
        transition: [transition, "opacity 150ms ease"]
          .filter(Boolean)
          .join(", "),
        opacity: isDragging ? 0.85 : undefined,
        zIndex: isDragging ? 1 : undefined,
      }}
      className="ds-kanban-card"
    >
      <button
        type="button"
        data-slot="kanban-card-grip"
        className="ds-kanban-card-grip"
        aria-label={`Move ${label}`}
        {...attributes}
        {...listeners}
      >
        <DotsSixVerticalIcon />
      </button>
      <div className="ds-kanban-card-body">{children}</div>
    </div>
  )
}

function KanbanColumnBody({
  columnId,
  itemIds,
  children,
}: {
  columnId: string
  itemIds: string[]
  children: React.ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: `kanban-column-${columnId}`,
    data: { columnId },
  })

  return (
    <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
      <div
        ref={setNodeRef}
        data-slot="kanban-column-list"
        data-over={isOver ? "" : undefined}
        className="ds-kanban-column-list"
      >
        {children}
      </div>
    </SortableContext>
  )
}

function Kanban<Item extends KanbanItem>({
  columns,
  items,
  defaultItems,
  onItemsChange,
  onMove,
  itemKey = (item) => item.id as string | number,
  renderCard,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "children"> & {
  columns: KanbanColumn[]
  /** Controlled card list. Omit it and pass `defaultItems` to let the board own the order. */
  items?: Item[]
  defaultItems?: Item[]
  onItemsChange?: (items: Item[]) => void
  /** Fired only when a card lands in a different column than it started in. */
  onMove?: (itemKey: string | number, toColumnId: string) => void
  itemKey?: (item: Item) => string | number
  renderCard?: (item: Item) => React.ReactNode
}) {
  const [list, setList] = useControllableValue<Item[]>({
    value: items,
    defaultValue: defaultItems ?? [],
    onChange: onItemsChange,
  })

  // The in-flight arrangement. Cards cross columns mid-drag so the lanes open
  // and close under the pointer, but `onItemsChange` must not fire on every
  // pointer move — so the drag mutates this and only the drop commits.
  const [preview, setPreview] = React.useState<Item[] | null>(null)
  const originColumn = React.useRef<string | null>(null)

  const rendered = preview ?? list
  const keyOf = (item: Item) => String(itemKey(item))

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const reposition = (
    source: Item[],
    activeKey: string,
    toColumn: string,
    overId: string
  ) => {
    const from = source.findIndex((item) => keyOf(item) === activeKey)
    if (from < 0) return source

    const sameColumn = source[from].column === toColumn
    const to = source.findIndex((item) => keyOf(item) === overId)

    // Landed on a column body rather than a card: there is no neighbour to sit
    // before, so it goes last.
    if (to < 0) {
      const rest = source.filter((_, index) => index !== from)
      rest.push({ ...source[from], column: toColumn } as Item)
      return rest
    }

    // Same column: arrayMove reads both indices out of the *original* array.
    // Splicing into a pre-filtered copy is what silently made every downward
    // move a no-op — removing the card first shifts its neighbour up by one, so
    // inserting before that neighbour lands exactly where it started.
    if (sameColumn) return arrayMove(source, from, to)

    const rest = source.filter((_, index) => index !== from)
    const at = rest.findIndex((item) => keyOf(item) === overId)
    rest.splice(at, 0, { ...source[from], column: toColumn } as Item)
    return rest
  }

  const onDragStart = ({ active }: DragStartEvent) => {
    const key = String(active.id)
    originColumn.current =
      rendered.find((item) => keyOf(item) === key)?.column ?? null
  }

  // Only container changes are previewed here. Ordering *within* a column is
  // already previewed by the sorting strategy's transforms, so re-arranging
  // state for it would fight the animation it is trying to show.
  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return
    const toColumn = over.data.current?.columnId as string | undefined
    if (!toColumn) return

    const current = preview ?? list
    const activeKey = String(active.id)
    const item = current.find((entry) => keyOf(entry) === activeKey)
    if (!item || item.column === toColumn) return

    setPreview(reposition(current, activeKey, toColumn, String(over.id)))
  }

  const settle = () => {
    setPreview(null)
    originColumn.current = null
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    const current = preview ?? list
    const activeKey = String(active.id)
    const toColumn = over?.data.current?.columnId as string | undefined
    const from = originColumn.current

    const next =
      over && toColumn
        ? reposition(current, activeKey, toColumn, String(over.id))
        : current

    settle()
    if (next !== list) setList(next)

    const landed = next.find((item) => keyOf(item) === activeKey)
    if (landed && from !== null && landed.column !== from) {
      onMove?.(itemKey(landed), landed.column)
    }
  }

  return (
    <div data-slot="kanban" className={cx("ds-kanban", className)} {...props}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragCancel={settle}
      >
        {columns.map((column) => {
          const cards = rendered.filter((item) => item.column === column.id)

          return (
            <div
              key={column.id}
              data-slot="kanban-column"
              className="ds-kanban-column"
            >
              <div
                data-slot="kanban-column-header"
                className="ds-kanban-column-header"
              >
                <div
                  data-slot="kanban-column-title"
                  className="ds-kanban-column-title"
                >
                  {column.title}
                </div>
                <span
                  data-slot="kanban-column-count"
                  className="ds-kanban-column-count"
                >
                  {cards.length}
                </span>
              </div>

              <KanbanColumnBody columnId={column.id} itemIds={cards.map(keyOf)}>
                {cards.map((item) => (
                  <KanbanCard
                    key={keyOf(item)}
                    id={keyOf(item)}
                    columnId={column.id}
                    label={
                      typeof item.title === "string"
                        ? item.title
                        : String(itemKey(item))
                    }
                  >
                    {renderCard ? (
                      renderCard(item)
                    ) : (
                      <KanbanCardTitle>
                        {item.title ?? String(itemKey(item))}
                      </KanbanCardTitle>
                    )}
                  </KanbanCard>
                ))}
              </KanbanColumnBody>
            </div>
          )
        })}
      </DndContext>
    </div>
  )
}

export { Kanban, KanbanCardTitle }
export type { KanbanColumn, KanbanItem }
