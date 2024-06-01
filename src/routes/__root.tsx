import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "./root.css";

export const Route = createRootRoute({
  component: () => (
    <main className="Main--content">
      {/* TODO: implement layout */}
      <header className="Header--container">
        <nav className="Nav--container">
          <ul>
            <li>
              <Link to="/" className="[&.active]:font-bold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/news" className="[&.active]:font-bold">
                News
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </main>
  ),
});
