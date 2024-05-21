import { render } from "../../utils";
import "./style.css";

interface LoaderState {}

export function setupLoader(element: HTMLElement) {
  if (!element) return;

  let state: LoaderState = {};
  renderLoader(state);

  function renderLoader(state: LoaderState) {
    const loaderHtml = `
        <div class="loader">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>`;
    render(element, loaderHtml);
  }
}
