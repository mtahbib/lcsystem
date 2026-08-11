import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "@/components/layout/MainLayout";

import Dashboard from "@/features/dashboard/pages/Dashboard";
import Customers from "@/features/customers/pages/Customers";
import LCManagement from "@/features/lc/pages/LCManagement";
import CreateLC from "@/features/lc/pages/CreateLC";
import MasterForm from "@/features/lc/pages/MasterForm";
import Shipments from "@/features/shipments/pages/Shipments";
import Documents from "@/features/documents/pages/Documents";
import GeneratedDocuments from "@/features/documents/pages/GeneratedDocuments";
import Settings from "@/features/settings/pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "lc",
        element: <LCManagement />,
      },
      {
        path: "lc/new",
        element: <CreateLC />,
      },
      {
        path: "lc/:id/edit",
        element: <CreateLC />,
      },
      {
        path: "lc/:id/master-form",
        element: <MasterForm />,
      },
      {
        path: "lc/:id/shipments/:shipmentId/documents",
        element: <GeneratedDocuments />,
      },
      {
        path: "shipments",
        element: <Shipments />,
      },
      {
        path: "documents",
        element: <Documents />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}