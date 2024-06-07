import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/App";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ResultsPage from "./pages/ResultsPage";
import "./style.css";

const queryClient = new QueryClient();

const router = createHashRouter(
  [
    {
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "profile",
          element: <Profile />
        },
        {
          path: "results",
          element: <ResultsPage />
        }
      ]
    }
  ],
  { basename: "/" }
);

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
