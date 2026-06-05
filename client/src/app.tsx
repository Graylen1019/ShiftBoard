import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Overview } from './pages/overview';
import { Tasks } from './pages/tasks';
import { RootLayout } from './layouts/root-layout';
import { OpenShiftModal } from './components/shift/open-shift-modal';
import { useShiftStore } from './store/shift-store';
import { Waste } from './pages/waste';
import { Report } from './pages/report';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'overview', element: <Overview /> },
      { path: 'tasks', element: <Tasks /> },
      { path: 'waste', element: <Waste /> },
      { path: 'reports', element: <Report /> },
      { path: 'settings', element: <div className="p-6">Settings Panel</div> },
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