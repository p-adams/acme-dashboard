import { setupAPOD } from "../apod";
import { setupTabs } from "../components/tabs";
import { DOM_UTILS, getAPOD, render } from "../utils";

// Define the initial state interface
interface DashboardState {
  count: number;
}

// Define the dashboard component
export function setupDashboard(element: HTMLDivElement) {
  let state: DashboardState = {
    count: 0,
  };

  // Initial render
  renderDashboard(state);

  // Event handler function for handling click events
  function handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains("Dashboard--container")) {
      // Update state and re-render dashboard
      state.count++;
      renderDashboard(state);
    }
  }

  // Render function for rendering the dashboard UI
  function renderDashboard(_state: DashboardState) {
    const dashboardHTML = `
      <div class="Dashboard--container">
        <!-- //TODO: build tab display for dashboard of up to 5 tabs -->
        <div id="TABS"></div>
        <div id="APOD"></div>
      </div>
    `;

    // Render dashboard UI
    render(element, dashboardHTML);

    // Attach event listener after rendering
    element.addEventListener("click", handleClick);
    setupTabs<HTMLDivElement>(
      DOM_UTILS.withSelectors<HTMLDivElement>("#TABS")!
    );
    setupAPOD<HTMLDivElement>(
      DOM_UTILS.withSelectors<HTMLDivElement>("#APOD")!
    );
  }
}
