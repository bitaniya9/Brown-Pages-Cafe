import "./styles/index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
//import pages
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="readingSpaces" element={<ReadingSpaces />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="events" element={<Events />} />
      </Route>
    )
  );
  return (
    <>
      <div className="app-contianer">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
