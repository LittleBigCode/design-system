import React from "react";
const { useState } = React;
import { h, F } from "../ui.js";
import {
  PageHeader, Tree, CodeBlock, Accordion, SectionHeading, EmptyState, Tag,
} from "../../../react/index.js";
import { KB_TREE, KB_ARTICLES } from "../data.js";

// Parent (group) label for a leaf id — used as a small Tag in the reader head.
const groupFor = (leafId) => {
  for (const g of KB_TREE) {
    if ((g.children || []).some((c) => c.id === leafId)) return g.label;
  }
  return null;
};

export function Knowledge() {
  // Selection is owned here; the Tree mirrors it via its own internal highlight.
  const [selectedId, setSelectedId] = useState("kb-pricing");
  const article = KB_ARTICLES[selectedId];

  return h(F, null,
    h(PageHeader, { title: "Knowledge base", subtitle: "Docs & playbooks" }),

    h("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "248px 1fr",
        gap: "24px",
        alignItems: "start",
        marginTop: "20px",
      },
    },
      // LEFT — navigation tree built straight from KB_TREE ({id,label,children}).
      h("div", null,
        h(Tree, {
          nodes: KB_TREE,
          defaultExpanded: KB_TREE.map((g) => g.id),
          onSelect: (node) => setSelectedId(node.id),
        })),

      // RIGHT — the article reader.
      h("div", null,
        article
          ? h(F, null,
              h("div", { className: "row", style: { gap: "10px", justifyContent: "space-between" } },
                h(SectionHeading, null, article.title),
                groupFor(selectedId) ? h(Tag, null, groupFor(selectedId)) : null),
              h("div", { className: "psub" }, article.lede),
              h("div", { className: "prose" },
                article.body.split(/\n{2,}/).map((para, i) => h("p", { key: i }, para))),
              h(CodeBlock, { language: "js", code: article.code }),
              h(SectionHeading, { style: { marginTop: "24px" } }, "FAQ"),
              h(Accordion, {
                items: (article.faq || []).map((f, i) => ({
                  id: "faq-" + i,
                  title: f.q,
                  content: f.a,
                })),
                defaultOpen: article.faq && article.faq.length ? "faq-0" : undefined,
              }))
          : h(EmptyState, { title: "Select an article", description: "Pick a topic from the tree to read its playbook." }))));
}
