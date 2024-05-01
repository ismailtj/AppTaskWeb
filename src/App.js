import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App min-h-screen">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

