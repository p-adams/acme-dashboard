import { getAPOD, render } from "../utils";
import "./style.css";

export function setupAPOD(element: HTMLElement) {
  if (!element) return;

  // Define the initial state interface
  interface APODState {
    apodData: Maybe<APOD>;
  }

  // Define the dashboard component

  let state: APODState = {
    apodData: null,
  };

  function setAPODData(data: any) {
    state.apodData = data;
    renderAPOD(state);
  }

  getAPOD().then((res) => setAPODData(res));

  // Initial render
  renderAPOD(state);

  // Render function for rendering the dashboard UI
  function renderAPOD(state: APODState) {
    const dashboardHTML = `
          ${
            state.apodData
              ? `<div class="APOD--container">
                    <h3>${
                      state.apodData.media_type === "video" ? "Video" : "Image"
                    } of The Day</h3>
                    <h3>${state.apodData.title} - <span>${
                  state.apodData.date
                }</h3>
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
      `;

    // Render dashboard UI
    render(element, dashboardHTML);
  }
}
