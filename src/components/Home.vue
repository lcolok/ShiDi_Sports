
<template>
  <div style="position:fixed;top:2px; bottom:2px; left:2px; right:2px;" :style="xsadd">
    <img class="casda" src="../assets/sy.png" />
    <div style="position:fixed;bottom:10%; left:50%;transform: translate(-50%,-50%);">
      <el-upload
        class="avatar-uploader"
        action="https://juniancc.top"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <div class="avatar-uploader-icon">
          <img class="casda" src="../assets/222.png" />
        </div>
      </el-upload>
    </div>
    <el-drawer
      title="选择风格"
      :visible.sync="drawer"
      direction="btt"
      size="68%"
      :show-close="false"
      :before-close="handleClose"
    >
      <template>
        <el-carousel
          :autoplay="false"
          type="card"
          width="100%"
          style="position:absolute;top:15%;bottom:5%; left:20px; right:20px;"
        >
          <el-carousel-item v-for="item in 3" :key="item">
            <img v-if="item==1" @click="openliul(item)" class="styleChoose" src="https://dn-shimo-attachment.qbox.me/2JYt1b6tBVADPy5x/demo1-1.png" />
            <img v-else-if="item==2" @click="openliul(item)" class="styleChoose" src="https://dn-shimo-attachment.qbox.me/mRdLTDGYcZEutnyW/demo2-1.png" />
            <img v-else @click="openliul(item)" class="styleChoose" src="https://dn-shimo-attachment.qbox.me/t914RfGAZ7MYyAz9/demo3-1.png" />
          </el-carousel-item>
          <el-dialog
            custom-class="sdada"
            :visible.sync="centerDialogVisible"
            center
            :modal="false"
            :show-close="false"
          >
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
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="generatorImage()">生 成</el-button>
            </span>
          </el-dialog>
        </el-carousel>
      </template>
    </el-drawer>
  </div>
</template>





<script>
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      loading: false,
      dataURL: "",
      clicksth: 1,
      xsadd: "",
      imageUrl: "",
      drawer: false,
      centerDialogVisible: false
    };
  },
  methods: {
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
    },
    handleClose(done) {
      this.xsadd = "";
      done();
    },
    openChout() {
      this.drawer = true;
    },
    readFile(files) {
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = e => {
        this.imageUrl = e.target.result;
        this.xsadd = "filter:blur(5px)";
        this.openChout();
      };
    },
    beforeAvatarUpload(file) {
      console.log(file.type);
      if (
        file.type == "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg"
      ) {
        this.readFile(file);
      } else {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      return false;
    }
  }
};
</script>

<style>
.sdada {
  margin-top: 5vh !important;
  width: 80%;
  position: fixed;
  top: 0px;
  left: 50%;
  transform: translate(-50%, -10%);
}
.avatar-uploader .el-upload {
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #060;
}
.avatar-uploader-icon {
  font-size: 36px;
  color: #060;
  width: 150px;
  height: 150px;
  line-height: 180px;
  text-align: center;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.casda {
  width: 100%;
  height: 100%;
  box-shadow: 0 6rpx 10rpx 2rpx #ccc !important;
  object-fit: cover;
}

.styleChoose {
  width: 100%;
  height: 100%;
  box-shadow: 0 6rpx 10rpx 2rpx #ccc !important;
  object-fit: contain;
}
</style>