import { screen } from "@testing-library/react";

type TestElement = Document | Element | Window | Node;

export function hasInputValue(e: TestElement, inputValue: string) {
  return screen.getByDisplayValue(inputValue) === e;
}
