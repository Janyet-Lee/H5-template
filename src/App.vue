<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="less">
html,
  body {
    height: 100%;
    width: 100%;
    font-size: 16px;
    font-family: PingFangSC-Regular, 'Helvetica Neue', Helvetica, 'PingFang SC',
      'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
    // 去除iOS点击DOM元素出现的半透明色块
    -webkit-tap-highlight-color: transparent;
    // 触摸顺滑
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  body {
    font-size: 12px;
    // background: @t-background;
    // 优化字体渲染
    margin: 0px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  * {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  img,
  input,
  button,
  textarea {
    border: none;
  }
  input,
  button {
    outline: none;
    &:focus {
      outline: none;
    }
  }
  textarea {
    resize: none;
  }
  // h1, h2, h3, h4, h5, h6
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  input,
  select,
  button,
  option,
  textarea {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
    line-height: inherit;
    color: inherit;
    outline: none;
  }

  /*取消部分浏览器`input[type='number']`的默认样式*/
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  height: 100%;
}
</style>
