import { defineStore } from 'pinia';

export const useThemeStore = defineStore({
  id: 'theme-store',
  state: () => ({
    systemTheme: 'primary',
    headerTheme: 'primary',
    siderTheme: 'black',
    darkMode: false,
    grayMode: false,
    colorWeak: false,
  }),
  getters: {
    /**
     * 主题信息
     */
    themes: () => {
      const themes = [
        { code: 'primary', color: '#3265F5', theme: 'primary', colour: 'dark' },
        { code: 'orange', color: '#F3752D', theme: 'orange', colour: 'dark' },
        { code: 'red', color: '#E34F47', theme: 'red', colour: 'dark' },
        { code: 'green', color: '#02A863', theme: 'green', colour: 'dark' },
        {
          code: 'black',
          color: '#2F3134',
          theme: 'primary',
          colour: 'dark',
          primaryAttrs: ['bgColor'],
        },
        {
          code: 'gray',
          color: '#F1F3F7',
          theme: 'primary',
          colour: 'light',
          primaryAttrs: ['textColor'],
        },
        {
          code: 'white',
          color: '#FFFFFF',
          theme: 'primary',
          colour: 'light',
          primaryAttrs: ['textColor'],
        },
      ];
      return themes;
    },
    vars: () => {
      var _vars = [
        // 顶部菜单主题颜色
        'HEADER_BG_COLOR', //背景色
        'HEADER_TEXT_COLOR', // 文字色
        'HEADER_MENU_SELECTED_BG_COLOR', // 菜单选中背景色
        'HEADER_BORDER_BOTTOM_COLOR', // 边框底边色
        // 左侧菜单主题颜色
        'SIDER_BG_COLOR', // 背景色
        'SIDER_BG_DARK_COLOR', // 背景色
        'SIDER_TEXT_COLOR', // 文字色
        'SIDER_MENU_HOVER_BG_COLOR', // 菜单悬浮背景色
        'SIDER_MENU_SELECTED_BG_COLOR', // 菜单选中背景色
        'SIDER_MENU_SELECTED_TEXT_COLOR', // 菜单选中字体色
        'SIDER_BORDER_RIGHT_COLOR', // 边框右边色
      ];

      // 生成对应的css变量
      const cssVars = {};
      _vars.forEach((key) => {
        ''.toLocaleLowerCase;
        const val = '--' + key.replaceAll('_', '-').toLocaleLowerCase();
        cssVars[key] = val;
      });
      return cssVars;
    },
    /**
     *  色系文字色
     */
    colors: () => {
      return {
        COLOUR_LIGHT_TEXT_COLOR: 'var(--colour-light-text-color)', // 浅色系
        COLOUR_DARK_TEXT_COLOR: 'var(--colour-dark-text-color)', // 深色系
      };
    },
  },
  actions: {
    /**
     * 获得单个主题信息
     *
     * @param {*} value
     * @return {*}
     */
    getThemeInfo(value) {
      const theme = value ?? this.systemTheme;
      const item = this.themes.find((item) => item.code === theme);
      // 增加主题色信息
      if (!item.themeColor) {
        const themeItem = this.themes.find((_item) => _item.code === item.theme);
        item.themeColor = themeItem.color;
      }
      return item;
    },
    /**
     * 设置主题值
     *
     * @param {*} theme
     * @param {*} value
     */
    toggleTheme(theme, value) {
      this[theme] = value;
    },
  },
});
