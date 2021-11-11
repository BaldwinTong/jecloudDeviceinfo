import { ref, watch } from 'vue';
import { toggleTheme } from '../../build/theme/utils';
import { themes } from '../../build/theme/config';

/**
 * 主题操作
 *
 * @export
 * @return {*}
 */
export function useTheme() {
  const theme = ref(themes[0]); // 默认主题
  const dark = ref(false); // 暗色主题
  // 修改主题
  const changeTheme = function (_theme: any) {
    theme.value = _theme;
    toggleTheme({
      scopeName: `theme-${_theme.code}-${dark.value ? 'dark' : 'default'}`,
    });
  };
  watch(
    () => dark.value,
    () => {
      changeTheme(theme.value);
    },
  );

  return { dark, theme, themes, changeTheme };
}
