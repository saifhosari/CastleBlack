import Cookies from "js-cookie";

const themeReducer = (
  state = Cookies.get("darkTheme")
    ? JSON.parse(Cookies.get("darkTheme"))
    : null,
  action
) => {
  switch (action.type) {
    case "DARK":
      return true;
    case "LIGHT":
      return false;

    default:
      return state;
  }
};

export default themeReducer;
