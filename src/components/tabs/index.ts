import "./style.css";

import { DOM_UTILS, render } from "../../utils";

export function setupTabs<T extends HTMLElement>(element: T) {
  renderTabs({});
  // Use custom events for now

  DOM_UTILS.withSelectors(".tabs")?.addEventListener("change", (e: any) => {
    const event = new CustomEvent("tabUpdate", {
      detail: { currentTab: e.target.dataset.tab },
    });
    document.dispatchEvent(event);
  });

  function renderTabs(_state: any) {
    const tabsHtml = `<div class="tabs">
        <div class="tab-item">
            <input type="radio" id="tab1" name="tab-group" data-tab="tab1" checked>
            <label for="tab1">Tab 1</label>
        </div>
        <div class="tab-item">
            <input type="radio" id="tab2" name="tab-group"  data-tab="tab2">
            <label for="tab2">Tab 2</label>
        </div>
        <div class="tab-item">
            <input type="radio" id="tab3" name="tab-group" data-tab="tab3">
            <label for="tab3">Tab 3</label>
        </div>
    </div>`;
    render(element, tabsHtml);
  }
}
