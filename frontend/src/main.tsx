import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import AppLayout from "./layouts/App";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
        ],
    },
]);

const container = document.getElementById("root");

const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ChakraProvider>
    </React.StrictMode>,
);
