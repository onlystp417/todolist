
module.exports = {
  // 在此設定的副作用，會造成每個 component 都有一大包 css
  // 建議只在這裡引入變數、@mixin 等共用的 css 
  // 其它的就在 app.vue 或是 component 各自引入樣式
  // cssPreprocessOptions: {
  //   scss: {
  //     additionalData: `
  //       @import "@/assets/scss/main.scss";
  //     `
  //   }
  // }
  // devServer: {
  //   port: 5500,
  // }
};