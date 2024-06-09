import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ErrorBoundary from "../pages/ErrorBoundary";
import PrivateRouter from "./PrivateRouter";
import Layout from "@/pages/Layout";
import { ProductsProvider } from "@/hooks/useProducts";

const AuthPage = lazy(() => import("../pages/Auth"));
const Products = lazy(() => import("../pages/Products"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Me = lazy(() => import("../pages/Me"));

const router = createBrowserRouter([
    {
        path: "/auth",
        element: (
            <div className="bg-secondary w-full overflow-hidden">
                <AuthPage />
            </div>
        ),
        errorElement: < ErrorBoundary />
    },
    {
        path: "/",
        element: (
            <PrivateRouter>
                <Layout>
                    <Dashboard />
                </Layout>
            </PrivateRouter>
        ),
        errorElement: < ErrorBoundary />
    },
    {
        path: "/products",
        element: (
            <PrivateRouter>
                <Layout>
                    <ProductsProvider>
                        <Products />
                    </ProductsProvider>
                </Layout>
            </PrivateRouter>
        ),
        errorElement: < ErrorBoundary />
    },
    {
        path: "/products/:id",
        element: (
            <PrivateRouter>
                <Layout>
                    <Me />
                </Layout>
            </PrivateRouter>
        ),
    },
    {
        path: "/me",
        element: (
            <PrivateRouter>
                <Layout>
                    <Me />
                </Layout>
            </PrivateRouter>
        ),
        errorElement: < ErrorBoundary />
    }
])

export {
    router
}
