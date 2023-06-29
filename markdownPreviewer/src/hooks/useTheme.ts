import { useReducer, useLayoutEffect } from "react";

const useTheme = (): [boolean, React.DispatchWithoutAction] => {
  const [dark, toggleDark] = useReducer((isDark: boolean): boolean => {
    if (isDark) {
      localStorage.removeItem("dark");
    } else {
      localStorage.setItem("dark", "https://youtu.be/dQw4w9WgXcQ");
    }
    return !isDark;
  }, localStorage.dark || window.matchMedia("(prefers-color-scheme: dark)").matches);

  // dark class for tailwind
  useLayoutEffect(() => {
    if (
      localStorage.getItem("dark") ||
      dark || "dark" in localStorage
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return [dark, toggleDark];
};

export default useTheme;
