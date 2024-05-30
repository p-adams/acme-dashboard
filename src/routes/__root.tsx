import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "./root.css";

export const Route = createRootRoute({
  component: () => (
    <main className="main-content">
      {/* TODO: implement layout */}
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" className="[&.active]:font-bold">
                Home
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
