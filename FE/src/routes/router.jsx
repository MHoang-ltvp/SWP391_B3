import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout.jsx";
import Home from "@/pages/Home.jsx";
import Jobs from "@/pages/Jobs.jsx";
import JobDetail from "@/pages/JobDetail.jsx";
import Login from "@/pages/Login.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "jobs", element: <Jobs /> },
      { path: "jobs/:id", element: <JobDetail /> },
      { path: "login", element: <Login /> },
    ],
  },
]);
