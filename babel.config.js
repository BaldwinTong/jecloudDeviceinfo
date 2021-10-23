module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    ["import", { libraryName: "ant-design-vue", style: true }, "ant-design-vue"],
    ["import", { libraryName: "vxe-table", style: true }, "vxe-table"],
    ["import", { libraryName: "@jecloud/ui", style: true }, "@jecloud/ui"],
  ],
};
