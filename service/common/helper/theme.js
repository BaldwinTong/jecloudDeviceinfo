import { toggleClass, darken, lighten } from '@jecloud/utils';
import { useThemeStore } from '../store/theme-store';

// 高亮系数
const darkenNum = 5;
/**
 * 初始主题
 */
export function setupTheme() {
  toggleSystemTheme();
}
/**
 * 切换主题
 *
 * @export
 * @param {*} theme
 * @param {*} value
 */
export function toggleTheme(theme, value) {
  const themeStore = useThemeStore();
  themeStore.toggleTheme(theme, value);
  switch (theme) {
    case 'systemTheme': // 系统主题
      toggleSystemTheme();
      break;
    case 'headerTheme': // 顶部菜单主题
      toggleHeaderTheme();
      break;
    case 'siderTheme': // 左侧菜单主题
      toggleSiderTheme();
      break;
    case 'darkMode': // 黑暗主题
      toggleDarkMode();
      break;
    case 'grayMode': // 灰色模式
      toggleGrayMode();
      break;
    case 'colorWeak': // 色弱模式
      toggleColorWeak();
      break;
  }
}

/**
 * 切换系统主题
 */
export const toggleSystemTheme = function () {
  const themeStore = useThemeStore();
  const theme = themeStore.getThemeInfo(); // 当前系统主题信息
  const dark = themeStore.darkMode;

  // 切换主题样式
  const themeCls = `theme-${theme.theme}-${dark ? 'dark' : 'default'}`;
  let currentHtmlClassNames = (document.body.className || '').split(/\s+/g);
  if (!currentHtmlClassNames.includes(themeCls)) {
    currentHtmlClassNames = currentHtmlClassNames.filter(
      (classname) => !classname.startsWith('theme-'),
    );
    currentHtmlClassNames.push(themeCls);
    document.body.className = currentHtmlClassNames.join(' ');
  }

  // 由于主题色变化，需要更新其他主题
  toggleTheme('headerTheme', themeStore.systemTheme);
  toggleTheme('siderTheme', themeStore.siderTheme);
};

/**
 * 切换顶部菜单主题
 *
 */
export const toggleHeaderTheme = function () {
  const themeStore = useThemeStore();
  const theme = themeStore.getThemeInfo(themeStore.headerTheme); // 顶部主题信息
  const dark = themeStore.darkMode;
  const { COLOUR_LIGHT_TEXT_COLOR, COLOUR_DARK_TEXT_COLOR } = themeStore.colors; // 文字色系值
  const {
    HEADER_BG_COLOR, // 背景色
    HEADER_TEXT_COLOR, // 文字色
    HEADER_MENU_SELECTED_BG_COLOR, // 菜单选中背景色
    HEADER_BORDER_BOTTOM_COLOR, // 边框底边色
  } = themeStore.vars;

  const lightColour = theme.colour === 'light'; // 浅色系
  let bgColor = theme.color;
  let textColor = lightColour ? COLOUR_LIGHT_TEXT_COLOR : COLOUR_DARK_TEXT_COLOR;
  let selectBgColor = darken(bgColor, darkenNum);
  let borderBottomColor = selectBgColor;

  // 黑暗主题
  if (dark) {
    // 默认使用black 背景色跟随主题色
    const blackTheme = themeStore.getThemeInfo('black');
    bgColor = blackTheme.color;
    textColor = COLOUR_DARK_TEXT_COLOR;
    selectBgColor = theme.themeColor;
    borderBottomColor = bgColor;
  }

  // 设置css变量
  setCssVar(HEADER_BG_COLOR, bgColor);
  setCssVar(HEADER_TEXT_COLOR, textColor);
  setCssVar(HEADER_MENU_SELECTED_BG_COLOR, selectBgColor);
  setCssVar(HEADER_BORDER_BOTTOM_COLOR, borderBottomColor);
};

/**
 * 切换左侧菜单主题
 *
 */
export const toggleSiderTheme = function () {
  const themeStore = useThemeStore();
  const theme = themeStore.getThemeInfo(themeStore.siderTheme); // 左侧菜单主题
  const dark = themeStore.darkMode;
  const { COLOUR_LIGHT_TEXT_COLOR, COLOUR_DARK_TEXT_COLOR } = themeStore.colors; // 文字色系值
  const {
    SIDER_BG_COLOR, // 背景色
    SIDER_BG_DARK_COLOR, // 背景深色
    SIDER_TEXT_COLOR, // 文字色
    SIDER_MENU_HOVER_BG_COLOR, // 菜单悬浮背景色
    SIDER_MENU_SELECTED_BG_COLOR, // 菜单选中背景色
    SIDER_MENU_SELECTED_TEXT_COLOR, // 菜单选中文字色
    SIDER_BORDER_RIGHT_COLOR, // 边框右边色
  } = themeStore.vars;

  const lightColour = theme.colour === 'light'; // 浅色系
  let bgColor = theme.color;
  let bgDarkColor = darken(bgColor, darkenNum);
  let textColor = lightColour ? COLOUR_LIGHT_TEXT_COLOR : COLOUR_DARK_TEXT_COLOR;
  let menuHoverBgColor = lighten(bgColor, darkenNum);
  let menuSelectedBgColor = darken(bgColor, darkenNum);
  let menuSelectedTextColor = textColor;
  let borderRightColor = menuSelectedBgColor;

  // 浅色系 选中颜色加深
  if (lightColour) {
    menuHoverBgColor = darken(bgColor, darkenNum / 2);
  }

  // 菜单选中信息跟随主题色变化的属性
  const themeInfo = themeStore.getThemeInfo(); // 系统主题信息
  // 菜单选中文字色
  if (theme.primaryAttrs?.includes('textColor')) {
    menuSelectedTextColor = themeInfo.themeColor;
  }
  // 菜单选中背景色
  if (theme.primaryAttrs?.includes('bgColor')) {
    menuSelectedBgColor = themeInfo.themeColor;
  }

  // 黑暗主题
  if (dark) {
    // 默认使用black主题
    const blackTheme = themeStore.getThemeInfo('black');
    bgColor = blackTheme.color;
    bgDarkColor = darken(bgColor, darkenNum);
    textColor = COLOUR_DARK_TEXT_COLOR;
    menuHoverBgColor = lighten(bgColor, darkenNum);
    menuSelectedBgColor = themeInfo.themeColor;
    menuSelectedTextColor = textColor;
    borderRightColor = menuHoverBgColor;
  }

  // 设置css变量
  setCssVar(SIDER_BG_COLOR, bgColor);
  setCssVar(SIDER_BG_DARK_COLOR, bgDarkColor);
  setCssVar(SIDER_TEXT_COLOR, textColor);
  setCssVar(SIDER_MENU_HOVER_BG_COLOR, menuHoverBgColor);
  setCssVar(SIDER_MENU_SELECTED_BG_COLOR, menuSelectedBgColor);
  setCssVar(SIDER_MENU_SELECTED_TEXT_COLOR, menuSelectedTextColor);
  setCssVar(SIDER_BORDER_RIGHT_COLOR, borderRightColor);
};

/**
 * 黑暗主题
 *
 */
export const toggleDarkMode = function () {
  toggleSystemTheme();
  toggleSiderTheme();
};

/**
 * 灰色模式
 *
 */
export const toggleGrayMode = function () {
  const grayModeCls = 'je-theme-gray-mode';
  toggleClass(grayModeCls);
};

/**
 * 色弱模式
 *
 */
export const toggleColorWeak = function () {
  const colorWeakCls = 'je-theme-color-weak';
  toggleClass(colorWeakCls);
};

/**
 * 设置css变量
 *
 * @param {*} prop
 * @param {*} val
 * @param {*} [dom=docEle]
 */
const docEle = document.body;
function setCssVar(prop, val, dom = docEle) {
  dom.style.setProperty(prop, val);
}
