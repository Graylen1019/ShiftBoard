// src/App.tsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Overview } from "./pages/overview";
import { Tasks } from "./pages/tasks";
import { RootLayout } from "./layouts/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // All children components render cleanly inside this shell
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "waste",
        element: <div className="p-6">Waste Management</div>,
      },
      {
        path: "reports",
        element: <div className="p-6">Reports Panel</div>,
      },
      {
        path: "settings",
        element: <div className="p-6">Settings Panel</div>,
      },
    ],
  },
  {
    path: "/login",
    element: <div className="h-screen w-screen flex items-center justify-center bg-[#141414] text-white">Login Page</div>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}