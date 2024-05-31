import { AuthProvider } from "./useAuth"
import { ThemeProvider } from "./useTheme";

const AppProvider = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageThemeKey="cotation-theme">
            <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
    )
}

export default AppProvider;
