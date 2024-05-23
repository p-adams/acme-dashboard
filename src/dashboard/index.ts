import { setupAPOD } from "../apod";
import { setupTabs } from "../components/tabs";
import { DOM_UTILS, getAPOD, render } from "../utils";

// Define the initial state interface
interface DashboardState {
  count: number;
  apodData: Maybe<APOD>;
}

// Define the dashboard component
export function setupDashboard(element: HTMLDivElement) {
  let state: DashboardState = {
    count: 0,
    apodData: null,
  };
  let currentTab: string | null = "tab1"; // currentTab: string | null; // some data-tab="tabName"

  // Initial render
  renderDashboard();

  // Event handler function for handling click events
  function _handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains("Dashboard--container")) {
      // Update state and re-render dashboard
      state.count++;
      renderDashboard(state);
    }
  }

  function setAPODData(data: any) {
    // Once data is fetched, dispatch a custom event
    const event = new CustomEvent("apodDataUpdated", {
      detail: data,
    });

    document.dispatchEvent(event);
  }
  // load picture of the day data

  getAPOD().then((res) => setAPODData(res));

  // Render function for rendering the dashboard UI
  function renderDashboard() {
    // TODO: maintain tab state in dashboard
    const dashboardHTML = `
      <div class="Dashboard--container">
        <!-- //TODO: build tab display for dashboard of up to 5 tabs -->
        Current tab: ${currentTab}
        <div id="TABS"></div>
        <div id="APOD"></div>
      </div>
    `;

    // Render dashboard UI
    render(element, dashboardHTML);

    // Attach event listener after rendering
    // element.addEventListener("click", handleClick);
    setupTabs<HTMLDivElement>(
      DOM_UTILS.withSelectors<HTMLDivElement>("#TABS")!
    );
    setupAPOD<HTMLDivElement>(
      DOM_UTILS.withSelectors<HTMLDivElement>("#APOD")!
    );
  }
  document.addEventListener("tabUpdate", (event: any) => {
    currentTab = event.detail.currentTab;
    renderDashboard();
  });
}
