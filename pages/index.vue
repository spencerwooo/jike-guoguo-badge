<template>
  <section class="container">
    <div class="badge-content">
      <div>
        <div id="badge-canvas">
          <div class="name-badge-canvas">
            <div class="user-avatar">
              <img class="user-avatar-image" v-bind:src="userinfo.avatarImage" alt="User avatar"/>
            </div>
            <div class="user-info-container">
              <div class="user-name">{{ userinfo.screenName }}</div>
              <div class="user-verified-container">
                <img v-bind:src="userinfo.verifyIcon" width="14px" style="vertical-align: middle; margin-right: 5px; margin-bottom: 4px;"/><span>{{ userinfo.verifyMessage}}</span>
              </div>
              <div class="user-like-info">
                关注他的人 {{ userinfo.statsCount.following }} | 他关注的人 {{ userinfo.statsCount.followed }}
              </div>  
            </div>
            <div class="user-bottomleft-container">
              <div class="user-bio" v-html="userinfo.bio"></div>
              <div class="user-playground-container">
                <div class="user-playground"># 今日份的摄影</div>
                <div class="user-playground"># JitHub</div>
                <div class="user-playground"># 即刻数码站</div>
              </div>
            </div>
            <div class="user-bottomright-container">
              <div class="user-qrcode-container">
                <canvas id="user-qr-code" />
              </div>
              <div class="user-follow-slogan">
                  <span class="name">下载即刻 App 搜索<br>👉{{ userinfo.screenName }}</span><br>
                  <span class="copyright">Made with ♥ by ⒿSpencerWoo</span>
              </div>
            </div>
            <div class="user-topright-container">
                已加入即刻社区 {{ userinfo.registerTime }} 天
            </div>
          </div>
        </div>
        <div class="after-canvas">
          <h1 class="title">
            喵，即刻生成你的名片
          </h1>
          <h2 class="subtitle">
            即刻非官方果果名片
          </h2>
          
          <form @submit="onSubmit" action="#" method="get">
            <input id="jike-name-input" v-model="form.jikeid" type="text" placeholder="还请填入你的即刻主页链接 (｡･∀･)ﾉﾞ"/>
            <div class="buttons">
              <button
                id="generate-btn"
                type="submit"
                class="button--blue">即刻生成</button>
              <a
                href="https://github.com/spencerwooo/jike-guoguo-badge"
                class="button--grey">GitHub</a>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  <Footer/>
  </section>
</template>

<script>
import Footer from "~/components/Footer.vue";
import Badge from "~/components/Badge.vue";
import axios from "axios";
import QRCode from "qrcode";
import domtoimage from "dom-to-image";
import saveAs from "file-saver";

export default {
  components: {
    Footer,
    Badge
  },
  data() {
    return {
      form: {
        jikeid: ""
      },
      userinfo: {
        username: "4DDA0425-FB41-4188-89E4-952CA15E3C5E",
        screenName: "SpencerWoo",
        bio:
          "Ⓙ瓦恁 等五百万人关注了他 ➭ <br> 一手键盘⌨️ / 一支相机📷 / 一把猫毛🐱",
        isVerified: true,
        verifyMessage: "编程话题优秀贡献者",
        verifyIcon:
          "https://cdn.ruguoapp.com/jike-web/static/images/verified.6e5b91e.svg",
        medals: [],
        avatarImage:
          "https://cdn.ruguoapp.com/FtuW2cr-elNtq2O4EMQ1EZJFb4Pw.jpg?imageView2/0/w/300/h/300/q/100!",
        statsCount: {
          followed: 1460,
          following: 374
        },
        registerTime: 565
      }
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      var jikeid = this.form.jikeid;
      var jikeLittleApi = "http://localhost:9000/api/jike/";
      var userdata;

      // Test axios module
      try {
        userdata = await axios.get(jikeLittleApi + jikeid);
        console.log(userdata.data);
      } catch (error) {
        if (jikeid == "") {
          alert(error + "\n咦？是不是什么也没输入？");
        } else {
          alert("出现了一点偏差，相关部门正在处理。");
        }
        console.log(error);
      }

      this.userinfo = userdata.data;
      var userHomePageUrl =
        "https://m.okjike.com/user/" + this.userinfo.username;
      if (!this.userinfo.isVerified) {
        this.userinfo.verifyIcon = this.userinfo.medals[0].picUrl;
        this.userinfo.verifyMessage = this.userinfo.medals[0].name
          .toString()
          .replace("“", "「")
          .replace("”", "」");
      }

      var canvas = document.getElementById("user-qr-code");
      var qrcodeConfig = {
        color: {
          dark: "#02a9f3",
          light: "#fff"
        },
        width: 90
      };
      QRCode.toCanvas(canvas, userHomePageUrl, qrcodeConfig, function(error) {
        if (error) console.error(error);
        console.log("success!");
      });

      var finalBadge = document.getElementById("badge-canvas");
      domtoimage.toPng(finalBadge).then(function(blob) {
        window.saveAs(blob, "jike-guoguo-badge.png");
      });
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.badge-content {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  -webkit-animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1)
    both;
  animation: fade-in-bottom 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

#badge-canvas {
  width: 640px;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
  background-size: contain;
  background-repeat: repeat-x;
  background-position: center;
  background-image: url("~assets/backgrounds/bg.png");
}

.name-badge-canvas {
  width: 594px;
  height: 297px;
  border-radius: 15px;
  box-shadow: 0 0 30px rgba(40, 40, 40, 0.3);
  background-color: #fff;
  overflow: hidden;
  background-image: url("");
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
}

.demo {
  width: 320px;
}

.user-avatar {
  width: 60px;
  height: 60px;
  float: left;
  margin: 37px 0 0 33px;
  border: #fbdf26 solid 1px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(251, 223, 38, 0.3);
  background-size: contain;
}

.user-avatar-image {
  border-radius: 30px;
  width: 59px;
  height: 59px;
}

.user-info-container {
  margin: 36px 0 0 120px;
  text-align: left;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
}

.user-verified-container {
  font-size: 12px;
  vertical-align: middle;
  margin-top: 6px;
}

.user-like-info {
  font-size: 12px;
  color: #b3b3b3;
  margin-top: 6px;
}

.user-bottomleft-container {
  position: absolute;
  font-size: 12px;
  bottom: 24px;
  left: 30px;
  text-align: left;
}

.user-bio {
  line-height: 1.6;
}

.user-playground-container {
  margin-top: 18px;
}

.user-playground {
  padding: 4px 12px;
  border-radius: 5px;
  background-color: #fff;
  margin-right: 8px;
  box-shadow: 0 0 20px rgba(40, 40, 40, 0.1);
  display: inline;
}

.user-topright-container {
  position: absolute;
  background-color: #01a9f4;
  color: #fff;
  font-size: 12px;
  top: 45px;
  right: -50px;
  transform: rotate(40deg);
  padding: 5px 60px;
  overflow: hidden;
  text-align: center;
}

.user-bottomright-container {
  position: absolute;
  font-size: 12px;
  bottom: 23px;
  right: 31px;
  text-align: right;
}

.user-qrcode-container {
  float: right;
  width: 90px;
  height: 90px;
  right: 20px;
  background-color: #b3b3b3;
}

.user-follow-slogan {
  margin-top: 100px;
}

.user-follow-slogan .name {
  font-size: 12px;
}

.user-follow-slogan .copyright {
  font-size: 9px;
  color: #b3b3b3;
}

.after-canvas {
  margin-top: 30px;
  text-align: center;
}

.title {
  font-family: sans-serif;
  display: block;
  font-weight: 900;
  font-size: 28px;
  color: #24292e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 400;
  font-size: 18px;
  color: #9b9b9b;
  /* word-spacing: 5px; */
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
  margin-top: 100px;
  border-radius: 4px;
  color: #9b9b9b;
}

.buttons {
  padding-top: 15px;
}

#generate-btn {
  font-size: 16px;
  cursor: pointer;
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
