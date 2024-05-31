import React from "react"

export const themes = {
    light: {
        background: "#eeeeee",
        color: "#000"
    },
    dark: {
        background: "#107cf1",
        color: "#fff"
    }
}

export const ThemeContext = React.createContext(themes.light)