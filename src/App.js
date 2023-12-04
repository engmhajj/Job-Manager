import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Landing, Login, Error, ProtectedRoute } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { AddJob, AllJobs, Profile, SharedLayout } from "./pages/Dashboard";
import Stats from "./pages/Dashboard/Stats";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <SharedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Stats />,
      },
      {
        path: "all-jobs",
        element: <AllJobs />,
      },
      {
        path: "add-job",
        element: <AddJob />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

function App() {
  return (
    <>
      <Provider store={store}>
        <ToastContainer position="top-center" />
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
