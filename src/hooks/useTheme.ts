import { ref, watch } from 'vue';
import { toggleTheme, themes } from '../../build/theme';

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
    toggleTheme(_theme, dark.value);
  };
  watch(
    () => dark.value,
    () => {
      changeTheme(theme.value);
    },
  );

  return { dark, theme, themes, changeTheme };
}
