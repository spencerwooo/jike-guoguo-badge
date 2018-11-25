module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  // 校验 .vue 文件
  plugins: [
    'html'
  ],
  // 自定义规则
  rules: {},
  globals: {}
}