import type {
  HTMLAttributes,
  ReactNode,
  ForwardRefExoticComponent,
  RefAttributes,
  MouseEvent,
} from "react";

export type ToastType = "info" | "success" | "warning" | "danger";

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Status family. Defaults to "info". */
  type?: ToastType;
  title?: ReactNode;
  message?: ReactNode;
  /** Render a borderless × dismiss button wired to this handler. */
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
}

/** Presentational toast card. */
export declare const Toast: ForwardRefExoticComponent<
  ToastProps & RefAttributes<HTMLDivElement>
>;

export interface ToastOptions {
  title?: ReactNode;
  message?: ReactNode;
  type?: ToastType;
  /** Auto-dismiss delay in ms. 0 disables. Defaults to the provider's duration. */
  duration?: number;
}

export interface ToastApi {
  /** Show a toast; returns its id. */
  show: (opts?: ToastOptions) => number;
  /** Dismiss a toast by id. */
  dismiss: (id: number) => void;
}

/** Access the toast API. Must be called inside a <ToastProvider>. */
export declare function useToast(): ToastApi;

export interface ToastProviderProps {
  children?: ReactNode;
  /** Default auto-dismiss delay in ms for show(). Defaults to 4000. */
  duration?: number;
}

export declare function ToastProvider(props: ToastProviderProps): JSX.Element;
