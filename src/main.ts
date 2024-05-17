import "./style.css";
import { setupDashboard } from "./dashboard/index.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Cosmic Dashboad</h1>
    <div class="card">
      <div id="dashboard"/>
    </div>
    <p class="read-the-docs">
      Click <a href="#">here</a> to learn more
    </p>
  </div>
`;

setupDashboard(document.querySelector<HTMLDivElement>("#dashboard")!);
