const antColors = require('@ant-design/colors');
const variables = require('./variables');
const { generate } = antColors;

/**
 * 获取主题
 *
 * @return {*}
 */
function getThemes() {
  const themes = [];
  Object.keys(variables).forEach((code) => {
    const theme = variables[code];
    themes.push({
      code,
      color: theme.primaryColor,
      vars: theme,
    });
  });
  return themes;
}
/**
 * 生成ant主题色
 *
 * @export
 * @param {string} color
 * @param {GenerateTheme} [theme='default']
 * @return {*}
 */
function generateAntColors(color, theme = 'default') {
  return generate(color, {
    theme,
  });
}

// 生成主题色
function getThemeColors(color) {
  const tc = color;
  const lightColors = generateAntColors(tc);
  const primary = lightColors[5];
  const modeColors = generateAntColors(primary, 'dark');
  return { default: lightColors, dark: modeColors };
}
/**
 * 调色板
 *
 * @export
 * @param {GenerateColorsParams} {
 *   color = primaryColor,
 *   mixLighten,
 *   mixDarken,
 *   tinycolor,
 * }
 * @return {*}
 */
function generateColors({ color, mixLighten, mixDarken, tinycolor }) {
  const arr = new Array(19).fill(0);
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5);
  });

  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5);
  });

  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString();
  });

  const shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.'));

  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#ffffff');

  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#000000');
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes('-'));
}

module.exports = {
  getThemeColors,
  generateColors,
  generateAntColors,
  getThemes,
};
