import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
