import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layouts/root-layout";
import { OpenShiftModal } from "./modules/overview/ui/components/open-shift-modal";
import { useShiftStore } from "./store/shift-store";

import { OverviewView } from "./modules/overview/ui/views/overview-view";
import { TasksView } from "./modules/tasks/ui/views/tasks-view";
import { WasteView } from "./modules/waste/ui/views/waste-view";
import { ReportView } from "./modules/report/ui/views/report-view";
import { SettingsView } from './modules/settings/ui/views/settings-view';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <OverviewView /> },
      { path: "overview", element: <OverviewView /> },
      { path: "tasks", element: <TasksView /> },
      { path: "waste", element: <WasteView /> },
      { path: "reports", element: <ReportView /> },
      { path: 'settings', element: <SettingsView /> },
    ],
  },
]);

export default function App() {
  const { currentShift } = useShiftStore();

  if (!currentShift) {
    return <OpenShiftModal />;
  }

  return <RouterProvider router={router} />;
}
