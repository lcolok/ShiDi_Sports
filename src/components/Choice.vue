<template>
  <el-drawer v-bind="$attrs">
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
          src="https://dn-shimo-attachment.qbox.me/mRdLTDGYcZEutnyW/demo2-1.png"
        />
        <img
          v-else
          @click="openliul(item)"
          class="styleChoose"
          src="https://dn-shimo-attachment.qbox.me/t914RfGAZ7MYyAz9/demo3-1.png"
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
          <span>
        

            <img
              v-if="dataURL!=''"
              style="width: 100%;height:100%;object-fit:fill;"
              class="real_pic"
              :src="dataURL"
            />
            <div v-if="dataURL==''" v-loading="loading">
              <div class="imageWrapper" ref="imageWrapper">
                <slot>
                  <div
                    :style="'background-image:url('+imageUrl+')'"
                    style="background-repeat: no-repeat;background-position: center;background-size:cover;"
                  >
                    <img
                      style="position:absolute;bottom:19%;right:12%;width: 40px;height:40px;"
                      src="../assets/4.jpg"
                    />
                    <img
                      v-if="clicksth==1"
                      style="width: 100%;height:100%;object-fit:fill;"
                      src="https://dn-shimo-attachment.qbox.me/ySxU0F4rbn4F9AgL/%E7%85%A7%E7%89%871-1.png"
                    />

                    <img
                      v-else-if="clicksth==2"
                      style="width: 100%;height:100%;object-fit:fill;"
                      src="https://dn-shimo-attachment.qbox.me/KUZB6YbsIwI9pyqe/%E7%85%A7%E7%89%872-1.png"
                    />
                    <img
                      v-else
                      style="width: 100%;height:100%;object-fit:fill;"
                      src="https://dn-shimo-attachment.qbox.me/s8eBgc4H64UeTndW/%E7%85%A7%E7%89%873-1.png"
                    />
                  </div>
                </slot>
              </div>
            </div>
          </span>
        </el-tooltip>
        <!-- <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="generatorImage()">生 成</el-button>
        </span>-->
      </el-dialog>
    </el-carousel>
  </el-drawer>
</template>

<script>
export default {
  name: "Choice",
  data() {
    return {

            
      clicksth: 1,
      imageUrl: "",
      loading: false,
      dataURL: "",
      centerDialogVisible: false,
   
    };
  },
  methods: {
    // 保存
    success(src) {
      this.src = src;
    },
    fail(err) {
      console.log("fail", err);
    },
    generatorImage() {
      this.loading = true;
      html2canvas(this.$refs.imageWrapper, {
        backgroundColor: null
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/jpeg");
        this.dataURL = dataURL;
        this.loading = false;
      });
    },

    openliul(item) {
      this.dataURL = "";
      this.clicksth = item;
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
  width: 90%;
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translate(-50%, -10%);
}
</style>