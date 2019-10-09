
<template>
  <div style="position:fixed;top:2px; bottom:2px; left:2px; right:2px;" :style="xsadd">
    <img class="casda" src="https://dn-shimo-attachment.qbox.me/wR83Zha3vJgAGxP0/%E9%A6%96%E9%A1%B5.png" />
    <div style="position:fixed;bottom:10%; left:50%;transform: translate(-50%,-50%);">
      <el-upload
        class="avatar-uploader"
        action="https://juniancc.top"
        :show-file-list="false"
        :before-upload="beforeAvatarUpload"
      >
        <div class="avatar-uploader-icon">
          <img class="casda" src="https://dn-shimo-attachment.qbox.me/bxTW5pBoIVcBxYGb/%E7%82%B9%E5%87%BB%E4%B8%8A%E4%BC%A0%E6%8C%89%E9%92%AE.png" />
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
      <Choice :imageUrl="imageUrl" :WH="WH" />
    </el-drawer>
  </div>
</template>





<script>
import Choice from "@/components/Choice";
export default {
  components: {
    Choice
  },
  data() {
    return {
      xsadd: "",
      drawer: false,
      imageUrl: "",
      WH: null
    };
  },
  methods: {
    readFile(files) {
      var reader = new FileReader();

      reader.readAsDataURL(files);
      reader.onload = async e => {
        this.imageUrl = e.target.result;

        let WH = await new Promise((resolve, reject) => {
          //获取宽高
          let image = new Image();
          image.src = e.target.result;
          image.onload = function() {
            resolve({ width: this.width, height: this.height });
          };
        });
        this.WH = WH;

        this.xsadd = "filter:blur(5px)";
        this.openChout();
      };
    },
    handleClose(done) {
      this.xsadd = "";
      done();
    },
    openChout() {
      this.drawer = true;
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
  width: 180px;
  height: 180px;
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
</style>