<template>
  <div class="page-container">
    <div class="advertise-section">
      <div class="title">| 基本信息</div>
      <el-form
        class="advertise-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
      >
        <el-form-item label="广告名称" style="width:100%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="slug" style="width:100%">
          <el-input v-model="form.slug"></el-input>
        </el-form-item>
        <div class="form-item">
          <el-form-item label="尺寸: 宽">
            <el-input v-model="form.width"></el-input>
          </el-form-item>
          <el-form-item label="尺寸: 高">
            <el-input v-model="form.height"></el-input>
          </el-form-item>
        </div>
        <el-form-item style="width:100%">
          <el-button class="Submit" type="primary" @click="onSubmit"
            >创建广告</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import advertise from "../gloabl/request/advertise";
export default {
  data() {
    return {
      form: {
        name: "",
        slug: "",
        width: "",
        height: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.form.created_time = new Date();
      advertise.create(this.form).then(res => {
        if (res.code == 200) {
          this.$router.push({ name: "Advertise" });
        } else {
          this.$message.err(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.el-upload {
  border: 1px dashed #d9d9d9;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.form-item {
  display: flex;
  justify-content: space-between;
}
.advertise-section {
  width: 800px;
  margin: auto;
  padding-top: 40px;
  .advertise-from {
    padding-top: 20px;
    text-align: justify;
    .el-form-item {
      display: inline-block;
      width: 40%;
    }
  }
}
.Submit {
  margin-top: 40px;
}
</style>
