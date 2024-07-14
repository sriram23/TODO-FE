import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Todo from "./components/todo";
import Login from "./components/login";
import Signup from "./components/signup";
import PrivateRoute from "./components/privateRouter";


const AppLayout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}

const router = createBrowserRouter([
    {
        path:"/",
        element: <AppLayout/>,
        children:[
            {
                path: '/',
                element: (<PrivateRoute><Todo/></PrivateRoute>)
            },
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"signup",
                element: <Signup/>
            }
        ]
    }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ChakraProvider><RouterProvider router={router} /></ChakraProvider>);