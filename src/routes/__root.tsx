import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" className="[&.active]:font-bold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="[&.active]:font-bold">
                Dashboard
              </Link>{" "}
            </li>
          </ul>
        </nav>
      </header>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
