import { useThemeStore } from '@common/store/theme-store';
import { toggleTheme } from '@common/helper/theme';

export function useThemeSetting({ mode }) {
  const themeStore = useThemeStore();

  const toggleThemeColor = function (item) {
    toggleTheme(mode, item.code);
  };
  const toggleThemeMode = function (checked) {
    toggleTheme(mode, checked);
  };

  return {
    toggleThemeMode,
    toggleThemeColor,
    themeStore,
  };
}
