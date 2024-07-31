import { AuthProvider } from "./useAuth"
import { ContactsProvider } from "./useContacts";
import { FirestoreProvider } from "./useFirestore";
import { ProductsProvider } from "./useProducts";
import { QuotationsProvider } from "./useQuotations";
import { SuppliersProvider } from "./useSuppliers";
import { ThemeProvider } from "./useTheme";

const AppProvider = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageThemeKey="cotation-theme">
            <FirestoreProvider>
                <SuppliersProvider>
                    <ContactsProvider>
                        <ProductsProvider>
                            <QuotationsProvider>
                                <AuthProvider>{children}</AuthProvider>
                            </QuotationsProvider>
                        </ProductsProvider>
                    </ContactsProvider>
                </SuppliersProvider>
            </FirestoreProvider>
        </ThemeProvider>
    )
}

export default AppProvider;
