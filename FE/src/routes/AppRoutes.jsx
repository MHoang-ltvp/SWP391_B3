import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/HomePage";
import JobsPage from "@/pages/JobsPage";
import JobDetailPage from "@/pages/JobDetailPage";
import LoginPage from "@/pages/LoginPage";
import JobManagePage from "@/pages/JobManagePage";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "jobs", element: <JobsPage /> },
      { path: "jobs/:id", element: <JobDetailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "dashboard/jobs", element: <JobManagePage /> },
    ],
  },
]);
