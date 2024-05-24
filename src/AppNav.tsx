import { Link } from "react-router-dom";

export default function AppNav() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
}
