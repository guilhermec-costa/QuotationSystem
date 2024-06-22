import { AuthProvider } from "./useAuth"
import { ContactsProvider } from "./useContacts";
import { ProductsProvider } from "./useProducts";
import { QuotationsProvider } from "./useQuotations";
import { SuppliersProvider } from "./useSuppliers";
import { ThemeProvider } from "./useTheme";

const AppProvider = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageThemeKey="cotation-theme">
            <SuppliersProvider>
                <ContactsProvider>
                    <ProductsProvider>
                        <QuotationsProvider>
                            <AuthProvider>{children}</AuthProvider>
                        </QuotationsProvider>
                    </ProductsProvider>
                </ContactsProvider>
            </SuppliersProvider>
        </ThemeProvider>
    )
}

export default AppProvider;
