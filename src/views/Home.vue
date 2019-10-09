
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
      <Choice />
    </el-drawer>
  </div>
</template>





<script>
import html2canvas from "html2canvas";
import Choice from "@/components/Choice";
export default {
  components: {
    Choice
  },
  data() {
    return {
      xsadd: "",
      drawer: false
    };
  },
  methods: {
    readFile(files) {
      var reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = e => {
        this.imageUrl = e.target.result;
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