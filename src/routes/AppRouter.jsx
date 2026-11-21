import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Keep the landing page eager; load secondary routes only when requested.
const Home = lazy(() => import("../pages/Home"));
const ProjectsPage = lazy(() => import("../pages/ProjectsPage"));
const ProjectDetail = lazy(() => import("../pages/ProjectDetail"));
const NotFound = lazy(() => import("../pages/NotFound"));

function RouteFallback() {
  return (
    <div className="container-width flex min-h-[55vh] items-center justify-center" role="status" aria-label="Loading page">
      <span className="route-loading-indicator" aria-hidden="true" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/:id", element: <ProjectDetail /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <RouterProvider
        router={router}
        future={{ v7_startTransition: true }}
      />
    </Suspense>
  );
}
