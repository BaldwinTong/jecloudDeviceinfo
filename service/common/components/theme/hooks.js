import { useThemeStore } from '@common/store/theme-store';
import { toggleTheme } from '@common/helper/theme';

export function useThemeSetting({ props, context }) {
  const { mode } = props;
  const { emit } = context;
  const themeStore = useThemeStore();

  const toggleThemeColor = function (item) {
    toggleTheme(mode, item.code);
    emit('toggle-theme-color', { mode, item });
  };
  const toggleThemeMode = function (checked) {
    toggleTheme(mode, checked);
    emit('toggle-theme-color', { mode, checked });
  };

  return {
    toggleThemeMode,
    toggleThemeColor,
    themeStore,
  };
}
