import { TinyColor } from '@ctrl/tinycolor';
import { generate } from '@ant-design/colors';
/**
 * 获取ant主题变量
 * @param {*} theme
 * @returns
 */
export function registerAntTheme(theme) {
  const variables = {};
  const globalPrefixCls = 'ant';
  const formatColor = (color, updater) => {
    let clone = color.clone();
    clone = updater?.(clone) || clone;
    return clone.toRgbString();
  };
  const generateTheme = { theme: theme.theme };
  const fillColor = (colorVal, type) => {
    const baseColor = new TinyColor(colorVal);
    const colorPalettes = generate(baseColor.toRgbString(), generateTheme);

    variables[`${type}-color`] = formatColor(baseColor);
    variables[`${type}-color-disabled`] = colorPalettes[1];
    variables[`${type}-color-hover`] = colorPalettes[4];
    variables[`${type}-color-active`] = colorPalettes[6];
    variables[`${type}-color-outline`] = baseColor.clone().setAlpha(0.2).toRgbString();
    variables[`${type}-color-deprecated-bg`] = colorPalettes[1];
    variables[`${type}-color-deprecated-border`] = colorPalettes[3];
  };

  // ================ Primary Color ================
  if (theme.primaryColor) {
    fillColor(theme.primaryColor, 'primary');

    const primaryColor = new TinyColor(theme.primaryColor);
    const primaryColors = generate(primaryColor.toRgbString(), generateTheme);
    // Legacy - We should use semantic naming standard
    primaryColors.forEach((color, index) => {
      variables[`primary-${index + 1}`] = color;
    });
    // Deprecated
    variables['primary-color-deprecated-l-35'] = formatColor(primaryColor, (c) => c.lighten(35));
    variables['primary-color-deprecated-l-20'] = formatColor(primaryColor, (c) => c.lighten(20));
    variables['primary-color-deprecated-d-03'] = formatColor(primaryColor, (c) => c.darken(3));
    variables['primary-color-deprecated-t-20'] = formatColor(primaryColor, (c) => c.tint(20));
    variables['primary-color-deprecated-t-50'] = formatColor(primaryColor, (c) => c.tint(50));
    variables['primary-color-deprecated-f-12'] = formatColor(primaryColor, (c) =>
      c.setAlpha(c.getAlpha() * 0.12),
    );

    const primaryActiveColor = new TinyColor(primaryColors[0]);
    variables['primary-color-active-deprecated-f-30'] = formatColor(primaryActiveColor, (c) =>
      c.setAlpha(c.getAlpha() * 0.3),
    );
    variables['primary-color-active-deprecated-d-02'] = formatColor(primaryActiveColor, (c) =>
      c.darken(2),
    );
  }

  // ================ Success Color ================
  if (theme.successColor) {
    fillColor(theme.successColor, 'success');
  }

  // ================ Warning Color ================
  if (theme.warningColor) {
    fillColor(theme.warningColor, 'warning');
  }

  // ================= Error Color =================
  if (theme.errorColor) {
    fillColor(theme.errorColor, 'error');
  }

  // ================= Info Color ==================
  if (theme.infoColor) {
    fillColor(theme.infoColor, 'info');
  }

  // Convert to css variables
  const cssVariables = {};
  Object.keys(variables).forEach((key) => {
    cssVariables[`--${globalPrefixCls}-${key}`] = variables[key];
  });

  return cssVariables;
}
