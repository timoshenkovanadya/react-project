import { ErrorInfo, ReactNode } from "react";

export type ErrorBoundaryPropsType = { children: ReactNode };
export type ErrorBoundaryStateType = {
  error: Error | null;
  errorInfo: ErrorInfo | null;
};
