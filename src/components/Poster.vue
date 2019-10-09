<template>
  <div id="app" class="share-image">
    <img :src="src" alt class="share-image" />
    <vue-canvas-poster class="poster" :painting="painting" @success="success" @fail="fail"></vue-canvas-poster>
  </div>
</template>
<script>
import seedland from "@/assets/seedland.png";
import sport from "@/assets/sport.png";

const pic = [
  "https://dn-shimo-attachment.qbox.me/ySxU0F4rbn4F9AgL/%E7%85%A7%E7%89%871-1.png",
  "https://dn-shimo-attachment.qbox.me/KUZB6YbsIwI9pyqe/%E7%85%A7%E7%89%872-1.png",
  "https://dn-shimo-attachment.qbox.me/s8eBgc4H64UeTndW/%E7%85%A7%E7%89%873-1.png"
];

const offset = [[-60, -75], [-10, -70], [0, 0]];

const fullWidth = 1080,
  fullHeight = 1920,
  qrcodeSize = 150,
  inset = 35;

export default {
  name: "Poster",
  components: {},

  computed: {
    styleIndex() {
      return this.chosenStyle - 1;
    },
    chosenPicURL() {
      return pic[this.styleIndex];
    },
    uploadedPic() {
      let width,
        height,
        x = 0,
        y = 0;
      let WHrate = this.WH.width / this.WH.height;
      let rate = fullWidth / fullHeight;
      if (rate > WHrate) {
        console.log("高比较长");
        console.log(rate);
        width = fullWidth;
        height = fullHeight * (rate / WHrate);
        y = (fullHeight-height)/2;
      } else {
        console.log("宽比较长");
        console.log(rate);
        width = fullWidth * (WHrate / rate);
        height = fullHeight;
         x = (fullWidth-width)/2;
      }
      return { width, height, x, y };
    },
    painting() {
      return {
        width: fullWidth,
        height: fullHeight,
        views: [
          //用户自己上传的图片
          {
            type: "image",
            url: this.imageUrl,
            left: this.uploadedPic.x,
            top: this.uploadedPic.y,
            width: this.uploadedPic.width,
            height: this.uploadedPic.height
          },
          //风格包装
          {
            type: "image",
            url: this.chosenPicURL,
            top: 0,
            left: 0,
            width: fullWidth,
            height: fullHeight
          },

          // 本地图片

          {
            type: "text",
            content: `长按或扫描二维码`,
            fontSize: 25,
            color: "#ffffff",
            left:
              fullWidth -
              qrcodeSize -
              qrcodeSize * 0.43 +
              offset[this.styleIndex][0],
            top:
              fullHeight -
              qrcodeSize +
              qrcodeSize * 0.77 +
              offset[this.styleIndex][1]
          },
          {
            type: "qrcode",
            content: "https://smc.wiki",
            background: "",
            color: "#fff",
            left: fullWidth - qrcodeSize - inset + offset[this.styleIndex][0],
            top: fullHeight - qrcodeSize - inset + offset[this.styleIndex][1],
            width: qrcodeSize,
            height: qrcodeSize
          }
        ]
      };
    }
  },
  data() {
    return {
      poster: false,
      src: ""
    };
  },
  methods: {
    // 保存
    success(src) {
      this.src = src;
    },
    fail(err) {
      console.log("fail", err);
    }
  },
  created() {
    console.log(this.WH.width);
  },
  props: {
    chosenStyle: Number,
    imageUrl: String,
    WH: Object
  }
};
</script>

<style>
.share-image {
  margin: 0px auto;
  width: 100%;
}
</style>
