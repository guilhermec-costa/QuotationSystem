import { AuthProvider } from "./useAuth"
import { ContactsProvider } from "./useContacts";
import { ProductsProvider } from "./useProducts";
import { SuppliersProvider } from "./useSuppliers";
import { ThemeProvider } from "./useTheme";

const AppProvider = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageThemeKey="cotation-theme">
            <SuppliersProvider>
                <ContactsProvider>
                    <ProductsProvider>
                        <AuthProvider>{children}</AuthProvider>
                    </ProductsProvider>
                </ContactsProvider>
            </SuppliersProvider>
        </ThemeProvider>
    )
}

export default AppProvider;
