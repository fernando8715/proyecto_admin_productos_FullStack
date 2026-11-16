import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layouts/Layout";
import { Products } from "../pages/Products";
import { NewProduct } from "../pages/newProduct";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "productos",
                element: <Products />
            },
            {
                path: "productos/nuevo",
                element: <NewProduct />
            }
        ]
    }
])