<template>
  <el-carousel
    :autoplay="false"
    type="card"
    width="100%"
    style="position:absolute;top:15%;bottom:5%; left:20px; right:20px;"
  >
    <el-carousel-item v-for="item in 3" :key="item">
      <img
        v-if="item==1"
        @click="openliul(item)"
        class="styleChoose"
        src="https://dn-shimo-attachment.qbox.me/2JYt1b6tBVADPy5x/demo1-1.png"
      />
      <img
        v-else-if="item==2"
        @click="openliul(item)"
        class="styleChoose"
        src="https://dn-shimo-attachment.qbox.me/8uRSXmBMs7w7ED8R/%E7%85%A7%E7%89%872-3.png"
      />
      <img
        v-else
        @click="openliul(item)"
        class="styleChoose"
        src="https://dn-shimo-attachment.qbox.me/i4HYlXTBsd8yLKIN/%E7%85%A7%E7%89%873-3.png"
      />
    </el-carousel-item>

    <el-dialog
      custom-class="dialogStyle"
      :visible.sync="centerDialogVisible"
      center
      :modal="false"
      :show-close="false"
    >
      <el-tooltip
        :value="centerDialogVisible"
        manual
        class="item"
        effect="dark"
        content="请长按保存后，分享给朋友吧"
        placement="top"
      >
        <Poster :chosenStyle="chosenStyle" :imageUrl="imageUrl" :WH="WH"/>
      </el-tooltip>
      <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="generatorImage()">生 成</el-button>
      </span>-->
    </el-dialog>
  </el-carousel>
</template>

<script>
import Poster from "@/components/Poster";
export default {
  name: "Choice",

  components: {
    Poster
  },
  data() {
    return {
      chosenStyle: null,
      loading: false,
      dataURL: "",
      centerDialogVisible: false
    };
  },
  props: {
    imageUrl: String,
    WH:Object
  },
  methods: {
    // 保存
    success(src) {
      this.src = src;
    },
    fail(err) {
      console.log("fail", err);
    },
    openliul(item) {
      this.dataURL = "";
      this.chosenStyle = item;
      this.centerDialogVisible = true;
    }
  }
};
</script>
<style>
.styleChoose {
  width: 100%;
  height: 100%;
  box-shadow: 0 6rpx 10rpx 2rpx #ccc !important;
  object-fit: contain;
}
.dialogStyle {
  width: 80%;

  position: fixed;
  top: -5%;
  left: 50%;
  transform: translate(-50%, -10%);
}
</style>