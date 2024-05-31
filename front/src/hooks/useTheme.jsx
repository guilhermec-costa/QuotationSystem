import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";

const ThemeContext = createContext({});

const ThemeProvider = ({ children, defaultTheme, storageThemeKey }) => {
    const [theme, setTheme] = useState(() => (
        localStorage.getItem(storageThemeKey) || defaultTheme
    ));

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("dark", "light");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : light;
            root.classList.add(systemTheme);
            return
        }
        root.classList.add(theme)
    }, [theme]);

    const ctxValue = {
        theme,
        setTheme: function (theme) {
            localStorage.setItem(storageThemeKey, theme);
            setTheme(theme);
        },
    }

    return <ThemeContext.Provider value={ctxValue}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error("useTheme must be used within a ThemeProvider")
    return context;
}

export {
    ThemeProvider,
    useTheme
}
