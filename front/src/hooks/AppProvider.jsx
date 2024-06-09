import { AuthProvider } from "./useAuth"
import { ProductsProvider } from "./useProducts";
import { ThemeProvider } from "./useTheme";

const AppProvider = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageThemeKey="cotation-theme">
            <ProductsProvider>
                <AuthProvider>{children}</AuthProvider>
            </ProductsProvider>
        </ThemeProvider>
    )
}

export default AppProvider;
