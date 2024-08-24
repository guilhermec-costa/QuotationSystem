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
				<UserProvider>
					<SuppliersProvider>
						<ContactsProvider>
							<PurchaseRequisitionProvider>
								<ProductsProvider>
									<QuotationsProvider>
										<AuthProvider>
											{children}
										</AuthProvider>
									</QuotationsProvider>
								</ProductsProvider>
							</PurchaseRequisitionProvider>
						</ContactsProvider>
					</SuppliersProvider>
				</UserProvider>
			</FirestoreProvider>
		</ThemeProvider>
	)
}

export default AppProvider;
