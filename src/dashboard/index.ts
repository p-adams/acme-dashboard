import { getAPOD, render } from "../utils";

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

  getAPOD().then((res) => setAPODData(res));

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
  function renderDashboard(state: DashboardState) {
    const dashboardHTML = `
      <div class="Dashboard--container">
      ${
        state.apodData
          ? `<div class="APOD--container">
                <h3>${
                  state.apodData.media_type === "video" ? "Video" : "Image"
                } of The Day</h3>
                <h3>${state.apodData.title} - <span>${state.apodData.date}</h3>
                <div class="Media--container">
                  ${
                    state.apodData.media_type === "video"
                      ? `<iframe width="560" height="315" src=${state.apodData.url} frameborder="0" allowfullscreen></iframe>
                    `
                      : `<img src=${state.apodData.url} alt="Picture of the Day"/>`
                  }
                </div>
            </div>`
          : `<div class="shimmer loader"></div>`
      }
      </div>
    `;

    // Render dashboard UI
    render(element, dashboardHTML);

    // Attach event listener after rendering
    element.addEventListener("click", handleClick);
  }

  function setAPODData(data: any) {
    state.apodData = data;
    renderDashboard(state);
  }
}
