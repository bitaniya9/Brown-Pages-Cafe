import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Spaces from "./pages/Spaces";
import Events from "./pages/Events";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookTable from "./components/BookTable";
import AdminPage from "./pages/AdminPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="spaces" element={<Spaces />} />
        <Route path="events" element={<Events />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>,
    ),
  );
  return (
    <div className="app-container">
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
