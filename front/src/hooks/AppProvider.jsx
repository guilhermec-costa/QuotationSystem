import { AuthProvider } from "./useAuth"
import { ContactsProvider } from "./useContacts";
import { ProductsProvider } from "./useProducts";
import { ThemeProvider } from "./useTheme";

const AppProvider = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageThemeKey="cotation-theme">
            <ContactsProvider>
                <ProductsProvider>
                    <AuthProvider>{children}</AuthProvider>
                </ProductsProvider>
            </ContactsProvider>
        </ThemeProvider>
    )
}

export default AppProvider;
