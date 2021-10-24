import "./App.css";
import Movies from "./components/movies";
import Pagination from "./components/pagination";

function App() {
  return (
    <main className="container">
      <Movies />
      <Pagination />
    </main>
  );
}

export default App;
