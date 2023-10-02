"use client";

import { Provider } from "jotai";

export default function JotaiProviders({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <Provider>{children}</Provider>;
}
