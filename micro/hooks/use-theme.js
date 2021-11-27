import { ref, watch } from 'vue';
import themes from '@micro/assets/themes/theme.json';
import { useConstant } from '@micro/hooks/use-constant';
import { toggleClass } from '@jecloud/utils';

/**
 * 设置主题
 *
 * @export
 */
export function setupTheme() {
  const defaultTheme = getThemes()[0];
  toggleTheme(defaultTheme);
}
/**
 * 主题操作
 *
 * @export
 * @return {*}
 */
export function useTheme() {
  const themes = getThemes();
  const theme = ref(themes[0]); // 默认主题
  const dark = ref(false); // 暗色主题
  const gray = ref(false); // 灰色模式
  const colorWeek = ref(false); // 色弱模式
  watch(
    () => [theme.value, dark.value, gray.value, colorWeek.value],
    (n, o) => {
      if (n[0] !== o[0] || n[1] !== o[1]) {
        // 主题色 或 主题模式
        toggleTheme(theme.value, dark.value);
      }
      if (n[2] !== o[2]) {
        // 灰色模式
        toggleGrayModa();
      }
      if (n[3] !== o[3]) {
        // 灰色模式
        toggleColorWeak();
      }
    },
  );

  return { dark, gray, colorWeek, theme, themes };
}

// 切换主题
export function toggleTheme(theme, dark) {
  const themeCls = `theme-${theme.code}-${dark ? 'dark' : 'default'}`;
  let currentHtmlClassNames = (document.body.className || '').split(/\s+/g);
  if (!currentHtmlClassNames.includes(themeCls)) {
    currentHtmlClassNames = currentHtmlClassNames.filter(
      (classname) => !classname.startsWith('theme-'),
    );
    currentHtmlClassNames.push(themeCls);
    document.body.className = currentHtmlClassNames.join(' ');
  }
}

/**
 * 获取主题
 *
 * @export
 * @return {*}
 */
function getThemes() {
  let { VUE_APP_THEME_COUNT: count = themes.length } = useConstant();
  if (count < 1 || count > themes.length) {
    count = themes.length;
  }
  return themes.slice(0, count);
}
/**
 * 灰色模式
 *
 */
function toggleGrayModa() {
  const grayModeCls = 'gray-mode';
  toggleClass(grayModeCls);
}

/**
 * 色弱模式
 *
 */
function toggleColorWeak() {
  const colorWeakCls = 'color-weak';
  toggleClass(colorWeakCls);
}
