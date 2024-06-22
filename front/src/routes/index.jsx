import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import ErrorBoundary from "../pages/ErrorBoundary";
import PrivateRouter from "./PrivateRouter";
import Layout from "@/pages/Layout";

const AuthPage = lazy(() => import("../pages/Auth"));
const Products = lazy(() => import("../pages/Products"));
const Contacts = lazy(() => import("../pages/Contacts"));
const Suppliers = lazy(() => import("../pages/Suppliers"));
const Quotations = lazy(() => import("../pages/Quotations"));
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
                    <Products />
                </Layout>
            </PrivateRouter>
        ),
        errorElement: < ErrorBoundary />
    },
    {
        path: "/contacts",
        element: (
            <PrivateRouter>
                <Layout>
                    <Contacts />
                </Layout>
            </PrivateRouter>
        ),
        errorElement: < ErrorBoundary />
    },
    {
        path: "/suppliers",
        element: (
            <PrivateRouter>
                <Layout>
                    <Suppliers />
                </Layout>
            </PrivateRouter>
        ),
        errorElement: < ErrorBoundary />
    },
    {
        path: "/quotations",
        element: (
            <PrivateRouter>
                <Layout>
                    <Quotations />
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
