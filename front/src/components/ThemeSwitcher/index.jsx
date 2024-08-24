import { useTheme } from "@/hooks/useTheme";
import { Sun, Moon } from "lucide-react"
import { useCallback } from "react";

const ThemeSwitcher = (props) => {
    const { theme, setTheme } = useTheme();
    const handleThemeChange = useCallback(() => {
        if (theme === "dark") {
            setTheme("light");
            return;
        }

        setTheme("dark");
    }, [theme]);

    const getThemeIcon = useCallback(() => {
        return theme === "dark" ? <Sun {...props} fill="#FABC3F" color="#E85C0D"/> : <Moon {...props} fill="" color=""/>
    })

    return (
        <button onClick={handleThemeChange}>
            {getThemeIcon()}
        </button>
    )
}

export default ThemeSwitcher;
