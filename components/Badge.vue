<template>
  <div id="badge-canvas">
    <!-- <img class="demo" src="~assets/backgrounds/demo.png" alt="Demo"/> -->
    <div class="name-badge-canvas">
      <div class="user-avatar" style="background-image: url('https://cdn.ruguoapp.com/FtuW2cr-elNtq2O4EMQ1EZJFb4Pw.jpg?imageView2/0/w/120/h/120/q/100!')"/>
      <div class="user-info-container">
        <div class="user-name">SpencerWoo</div>
        <div class="user-verified-container">
          <img src="" width="28px" style="vertical-align: middle; margin-right: 10px; margin-bottom: 5px;"><span>编程话题优秀贡献者</span>
        </div>
        <div class="user-like-info">
          关注他的人 1k | 他关注的人 329
        </div>  
      </div>
      <div class="user-bottomleft-container">
        <div class="user-bio">
          Ⓙ瓦恁 等五百万人关注了他 ➭<br>
          一手键盘⌨️ / 一支相机📷 / 一把猫毛🐱
        </div>
        <div class="user-playground-container">
          <div class="user-playground"># 今日份的摄影</div>
          <div class="user-playground"># JitHub</div>
          <div class="user-playground"># 即刻数码站</div>
        </div>
      </div>
      <div class="user-bottomright-container">
          <div class="user-qr-code"></div>
          <div class="user-follow-slogan">
              <span class="name">下载即刻 App 搜索<br>👉SpencerWoo</span><br>
              <span class="copyright">Made with ♥ by ⒿSpencerWoo</span>
          </div>
      </div>
      <div class="user-topright-container">
          已加入即刻社区 399 天
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        screenName: "SpencerWoo",
        bio: "bio",
        isVerified: userInfo.isVerified,
        verifyMessage: userInfo.verifyMessage,
        medals: userInfo.medals,
        avatarImage: userInfo.avatarImage.smallPicUrl,
        statsCount: {
          followed: userInfo.statsCount.followedCount,
          following: userInfo.statsCount.followingCount
        },
        registerTime: registerTime
      }
    };
  }
};
</script>

<style>
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
  border-radius: 29px;
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

.user-qr-code {
  float: right;
  width: 90px;
  height: 90px;
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
</style>
