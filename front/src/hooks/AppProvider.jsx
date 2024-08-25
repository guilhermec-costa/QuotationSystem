import { AuthProvider } from "./useAuth"
import { ContactsProvider } from "./useContacts";
import { FirestoreProvider } from "./useFirestore";
import { ProductsProvider } from "./useProducts";
import { PurchaseRequisitionProvider } from "./usePurchaseRequisitions";
import { QuotationsProvider } from "./useQuotations";
import { SuppliersProvider } from "./useSuppliers";
import { ThemeProvider } from "./useTheme";
import { UserProvider } from "./useUsers";

const AppProvider = ({ children }) => {
	return (
		<ThemeProvider defaultTheme="dark" storageThemeKey="cotation-theme">
			<FirestoreProvider>
				<AuthProvider>
					<SuppliersProvider>
						<ProductsProvider>
							<ContactsProvider>
								<PurchaseRequisitionProvider>
									<QuotationsProvider>
										{children}
									</QuotationsProvider>
								</PurchaseRequisitionProvider>
							</ContactsProvider>
						</ProductsProvider>
					</SuppliersProvider>
				</AuthProvider>
			</FirestoreProvider>
		</ThemeProvider>
	)
}

export default AppProvider;
