import { ref, watch } from 'vue';
import { toggleTheme, getThemes } from '../../build/theme';
const themes = getThemes();
/**
 * 主题操作
 *
 * @export
 * @return {*}
 */
export function useTheme() {
  const { hasClass, addClass, removeClass } = JE;
  const theme = ref(themes[0]); // 默认主题
  const dark = ref(false); // 暗色主题
  const gray = ref(false); // 灰色模式
  const colorWeek = ref(false); // 色弱模式
  // 修改主题
  const changeTheme = function (_theme) {
    theme.value = _theme;
    toggleTheme(_theme, dark.value);
  };
  watch(
    () => [dark.value, gray.value, colorWeek.value],
    (modes, oldModes) => {
      const body = document.body;
      if (modes[0] !== oldModes[0]) {
        // 主题
        changeTheme(theme.value);
      }
      if (modes[1] !== oldModes[1]) {
        // 灰色模式
        if (hasClass(body, 'gray-mode')) {
          removeClass(body, 'gray-mode');
        } else {
          addClass(body, 'gray-mode');
        }
      }
      if (modes[2] !== oldModes[2]) {
        // 灰色模式
        if (hasClass(body, 'color-weak')) {
          removeClass(body, 'color-weak');
        } else {
          addClass(body, 'color-weak');
        }
      }
    },
  );
  watch(
    () => dark.value,
    () => {
      changeTheme(theme.value);
    },
  );

  return { dark, gray, colorWeek, theme, themes, changeTheme };
}
