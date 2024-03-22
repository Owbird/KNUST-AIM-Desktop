import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import AppLayout from "./layouts/App";

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
            <RouterProvider router={router} />
        </ChakraProvider>
    </React.StrictMode>,
);
