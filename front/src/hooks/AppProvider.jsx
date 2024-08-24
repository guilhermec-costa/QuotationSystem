import { AuthProvider } from "./useAuth"
import { ContactsProvider } from "./useContacts";
import { FirestoreProvider } from "./useFirestore";
import { ProductsProvider } from "./useProducts";
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
							<ProductsProvider>
								<QuotationsProvider>
									<UserProvider>
										<AuthProvider>
											{children}
										</AuthProvider>
									</UserProvider>
								</QuotationsProvider>
							</ProductsProvider>
						</ContactsProvider>
					</SuppliersProvider>
				</UserProvider>
			</FirestoreProvider>
		</ThemeProvider>
	)
}

export default AppProvider;
