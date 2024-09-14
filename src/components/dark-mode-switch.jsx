import { useTheme } from "../context/theme-context";
import { Switch } from "react-native";

// esta es la función del switch del modo oscuro
export default function DarkModeSwitch() {
    const { isDarkMode, toggleDarkMode } = useTheme()

    return (
        <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={ isDarkMode ? '#f5dd4b' : '#f4f3f4' }
        />
    )
}