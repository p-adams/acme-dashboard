import { createLazyFileRoute } from "@tanstack/react-router";
import "./App.css";

export const Route = createLazyFileRoute("/")({
  component: App,
});

function App() {
  return (
    <section>
      <h1>Cosmic Dashboard</h1>
      <div>
        <div>main</div>
        <aside>NASA picture of the day</aside>
      </div>
    </section>
  );
}

export default App;
