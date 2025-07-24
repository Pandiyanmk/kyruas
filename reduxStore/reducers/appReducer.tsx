import { Appearance } from "react-native";

const initialState = {
    theme: Appearance.getColorScheme(),
  };
  
  const appReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_THEME':
        return { ...state, theme: action.payload};
      default:
        return state;
    }
  };
  
  export default appReducer;