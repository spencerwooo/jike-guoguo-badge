<template>
  <div>
    <nuxt/>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

body {
  background-color: #fbdf26;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--blue {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #01a9f4;
  color: #fff;
  background-color: #01a9f4;
  text-decoration: none;
  padding: 12px 30px;
}

.button--blue:hover {
  color: #fff;
  background-color: #01a9f4;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #24292e;
  color: #fff;
  background-color: #24292e;
  text-decoration: none;
  padding: 12px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #24292e;
}
</style>
