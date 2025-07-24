import { Appearance } from "react-native";

export const setTheme = (theme = Appearance.getColorScheme()) => ({
    type: "SET_THEME", payload: theme
  });