<template>
  <section class="container">
    <div class="badge-content">
      <div id="badge-canvas">
        <transition name="fade">
          <div id="name-badge-canvas" v-if="loading">
            <div class="user-avatar">
              <img class="user-avatar-image" v-bind:src="userinfo.avatarImage" alt="User avatar">
            </div>
            <div class="user-info-container">
              <div class="user-name">{{ userinfo.screenName }}</div>
              <div class="user-verified-container">
                <img v-bind:src="userinfo.verifyIcon" width="28px" style="vertical-align: middle; margin-right: 5px; margin-bottom: 8px;">
                <span>{{ userinfo.verifyMessage}}</span>
              </div>
              <div class="user-like-info">
               {{ userinfo.statsCount.following }} 关注 | {{ userinfo.statsCount.followed }} 粉丝 | {{ userinfo.statsCount.liked }} 赞同 | {{ userinfo.statsCount.editorPicked}} 次精选
              </div>
            </div>
            <div class="user-bottomleft-container">
              <div class="user-bio" v-html="userinfo.bio"></div>
              <div class="user-playground-container">
                <div class="user-playground"># {{ form.userplayground1 }}</div>
                <div class="user-playground"># {{ form.userplayground2 }}</div>
                <div class="user-playground"># {{ form.userplayground3 }}</div>
              </div>
            </div>
            <img id="guoguo" src="~/assets/backgrounds/guoguo.png" alt="guoguo-guoguo">
            <div class="user-topright-container">已加入即刻社区 {{ userinfo.registerTime }} 天</div>
            <div class="user-bottomright-container">
              <div class="user-qrcode-container" v-html="qrcodesvg"></div>
              <div class="user-follow-slogan">
                <div class="name">👉 扫描二维码，即刻加我</div>
                <div class="copyright">♥ from ⒿSpencerWoo</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <div class="after-canvas">
        <h1 class="title">喵，即刻生成你的名片</h1>
        <h2 class="subtitle">Unofficial Jike GuoGuo name badge</h2>
        <form @submit="onSubmit" action="#" method="get">
          <br>
          <label for="jike-name-input">Jike User Name</label><br>
          <input id="jike-name-input" v-model="form.jikeid" type="text" placeholder="(｡･∀･)ﾉﾞ"><br>
          <br>
          <label for="jike-name-input">Jike Playgrounds</label><br>
          <input id="jike-playground-input" v-model="form.userplayground1" type="text" placeholder="o(=•ェ•=)m"><br>
          <input id="jike-playground-input" v-model="form.userplayground2" type="text" placeholder="( •̀ ω •́ )✧"><br>
          <input id="jike-playground-input" v-model="form.userplayground3" type="text" placeholder="q(≧▽≦q)">
          <div class="buttons">
            <button id="generate-btn" type="submit" class="button--blue">即刻生成</button>
            <a href="https://github.com/spencerwooo/jike-guoguo-badge" class="button--grey">GitHub</a>
          </div>
          <button id="download-btn" type="submit" v-on:click="onDownload" class="button--blue">下载名片</button>
        </form>
      </div>
    </div>
    <Footer/>
  </section>
</template>

<script>
import Footer from "~/components/Footer.vue";
import axios from "axios";
import QRCode from "qrcode";
import domtoimage from "dom-to-image";
import saveAs from "file-saver";

export default {
  components: {
    Footer
  },
  data() {
    return {
      loading: true,
      form: {
        jikeid: "SpencerWoo",
        userplayground1: "今日份的摄影",
        userplayground2: "JitHub",
        userplayground3: "即刻数码站"
      },
      userinfo: {
        username: "4DDA0425-FB41-4188-89E4-952CA15E3C5E",
        screenName: "SpencerWoo",
        bio: "🐱 啊呀，你发现了这个果果名片生成器！q(≧▽≦q)<br> 🦊 右边三个主题随便填哦 (*￣3￣)╭",
        isVerified: true,
        verifyMessage: "各种话题优秀贡献者 \\(￣︶￣*\\))",
        verifyIcon: "https://cdn.ruguoapp.com/jike-web/static/images/verified.6e5b91e.svg",
        medals: [],
        avatarImage: "https://cdn.ruguoapp.com/FtuW2cr-elNtq2O4EMQ1EZJFb4Pw.jpg?imageView2/0/w/300/h/300/q/100!",
        statsCount: {
          followed: "500 万",
          following: 374,
          editorPicked: 73,
          liked: '27.5k'
        },
        registerTime: "好多"
      },
      qrcodesvg: '<img src="/icon.png" width="162px" height="162px">'
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      this.loading = false;
      var jikeid = this.form.jikeid;
      var jikeLittleApi = "http://localhost:9000/api/jike/";
      var userdata;

      // Test axios module
      try {
        userdata = await axios.get(jikeLittleApi + jikeid);
      } catch (error) {
        alert(error + "\n出现了一点偏差，相关部门正在处理。");
        console.log(error);
      }

      try {
        // when user is not verified, use medal instead
        this.userinfo = userdata.data;
        var userHomePageUrl = "https://m.okjike.com/user/" + this.userinfo.username;
        if (!this.userinfo.isVerified) {
          this.userinfo.verifyIcon = this.userinfo.medals[0].picUrl;
          this.userinfo.verifyMessage = this.userinfo.medals[0].name.toString().replace("“", "「").replace("”", "」");
        }
        if (this.userinfo.statsCount.liked > 1e4) {
          this.userinfo.statsCount.liked = (this.userinfo.statsCount.liked / 1e3).toFixed(1) + 'k';
        }

        // generate user qrcode
        var qrcodeSvgString;
        var qrcodeConfig = {
          color: {
            dark: "#02a9f3",
            light: "#fff"
          },
          margin: 0,
          width: 162
        };

        QRCode.toString(userHomePageUrl, qrcodeConfig, function(err, string) {
          if (err) console.error(err);
          console.log("Generated!");
          qrcodeSvgString = string;
        });
        this.qrcodesvg = qrcodeSvgString;
      } catch (error) {
        alert(error + "\n出现了一点偏差，相关部门正在处理。");
        console.log(error);
      }

      this.loading = true;
    },
    onDownload() {
      // save image to device
      var finalBadge = document.getElementById("badge-canvas");
      domtoimage.toPng(finalBadge).then(function(blob) {
        window.saveAs(blob, "jike-guoguo-badge.png");
      });
    }
  }
};
</script>

<style>
label {
  font-weight: 800;
  font-style: italic;
}

.badge-content {
  margin-left: 50px;
  min-height: 100vh;
  min-width: 1500px;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: left;
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

#badge-canvas {
  width: 1230px;
  height: 691px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
  background-size: contain;
  background-repeat: repeat-x;
  background-position: center;
  background-image: url("~assets/backgrounds/bg.png");
}

#name-badge-canvas {
  width: 1084px;
  height: 517px;
  border-radius: 30px;
  box-shadow: 0 0 60px rgba(40, 40, 40, 0.3);
  background-color: #fff;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.user-avatar {
  width: 108px;
  height: 108px;
  float: left;
  margin: 66px 0 0 56px;
  border: #fbdf26 solid 2px;
  border-radius: 54px;
  background-color: #fff;
  box-shadow: 0 0 40px rgba(251, 223, 38, 0.3);
  background-size: contain;
}

.user-avatar-image {
  border-radius: 52px;
  width: 104px;
  height: 104px;
}

.user-info-container {
  margin: 66px 0 0 221px;
  text-align: left;
}

.user-name {
  font-size: 42px;
  font-weight: bold;
  max-width: 600px;
}

.user-verified-container {
  font-size: 21px;
  vertical-align: middle;
  margin-top: 10px;
}

.user-like-info {
  font-size: 21px;
  color: #b3b3b3;
  margin-top: 10px;
}

.user-bottomleft-container {
  position: absolute;
  font-size: 21px;
  bottom: 42px;
  left: 55px;
  text-align: left;
}

.user-bio {
  line-height: 1.6;
}

.user-playground-container {
  margin-top: 30px;
}

.user-playground {
  padding: 7px 20px;
  border-radius: 10px;
  background-color: #fff;
  margin-right: 12px;
  box-shadow: 0 0 40px rgba(40, 40, 40, 0.1);
  display: inline;
}

#guoguo {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 120px;
  transform: rotate(40deg);
}

.user-topright-container {
  position: absolute;
  background-color: #01a9f4;
  color: #fff;
  font-size: 21px;
  top: 90px;
  right: -100px;
  transform: rotate(40deg);
  padding: 9px 120px;
  overflow: hidden;
  text-align: center;
}

.user-bottomright-container {
  position: absolute;
  bottom: 32px;
  right: 56px;
  text-align: right;
}

.user-qrcode-container {
  float: right;
  width: 162px;
  height: 162px;
}

.user-follow-slogan {
  max-width: 400px;
  max-height: 300px;
  line-height: 1.6;
  margin-top: 180px;
}

.user-follow-slogan .name {
  font-size: 18px;
}

.user-follow-slogan .copyright {
  font-size: 14px;
  color: #b3b3b3;
}

.after-canvas {
  text-align: left;
}

.title {
  font-weight: bold;
  font-size: 25px;
  color: #404040;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 600;
  font-style: italic;
  font-size: 14px;
  color: #808080;
  padding: 15px 0;
}

#jike-name-input {
  width: 257px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  border: none;
  margin-top: 10px;
  border-radius: 4px;
  color: #808080;
}

#jike-playground-input {
  width: 257px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  border: none;
  margin-top: 10px;
  border-radius: 4px;
  color: #808080;
}

.buttons {
  margin-top: 50px;
  margin-bottom: 15px;
}

#generate-btn {
  font-size: 16px;
  cursor: pointer;
}

#download-btn {
  font-size: 16px;
  cursor: pointer;
  width: 257px;
  height: 50px;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
/* ----------------------------------------------
 * Generated by Animista on 2018-11-20 20:45:18
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation fade-in-bottom
 * ----------------------------------------
 */
@-webkit-keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes fade-in-bottom {
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
