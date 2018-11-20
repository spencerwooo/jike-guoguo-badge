<template>
  <section class="container">
    <div class="badge-content">
      <Badge/>
      <div class="after-canvas">
        <h1 class="title">
          喵，即刻生成你的名片
        </h1>
        <h2 class="subtitle">
          即刻非官方果果名片
        </h2>
        <input class="jike-name-input" type="text" placeholder="还请填入你的即刻主页链接(｡･∀･)ﾉﾞ">
        <div class="links">
          <a
            href="/"
            target="_blank"
            class="button--blue">即刻生成</a>
          <a
            href="https://github.com/spencerwooo/jike-guoguo-badge"
            target="_blank"
            class="button--grey">GitHub</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Badge from '~/components/Badge.vue'

export default {
  components: {
    Logo,
    Badge
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.badge-content {
  /* animation: slideIn 1s cubic-bezier(.34,.01,.4,.99) forwards;
  animation-delay: .25s;
  transform: translateY(100vh); */
}

.after-canvas {
  margin-top: 30px;
  text-align: center;
}

.title {
  font-family: sans-serif;
  display: block;
  font-weight: 800;
  font-size: 28px;
  color: #24292e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 600;
  font-size: 18px;
  color: #9b9b9b;
  /* word-spacing: 5px; */
  padding: 15px 0;
}

.jike-name-input {
  width: 250px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  border: none;
  margin-top: 100px;
  border-radius: 4px;
}

.links {
  padding-top: 15px;
}

</style>
