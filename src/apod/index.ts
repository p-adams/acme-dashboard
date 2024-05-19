import { render } from "../utils";
import "./style.css";

export function setupAPOD(element: HTMLElement) {
  if (!element) return;
  render(element, `<div>Hello, World!</div>`);
}
