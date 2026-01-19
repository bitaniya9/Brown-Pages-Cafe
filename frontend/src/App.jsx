import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
// import ReadingSpaces from "./pages/ReadingSpaces";
// import Contacts from "./pages/Contacts";
import Events from "./pages/Events";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        {/* <Route path="readingSpaces" element={<ReadingSpaces />} />
        <Route path="contacts" element={<Contacts />} /> */}
        <Route path="events" element={<Events />} />
        {/* <Route path="events/:id" element={<EventDetails />} /> */}
        <Route path="signup" element={<Signup />} />
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
