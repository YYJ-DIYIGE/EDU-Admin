<template>
  <div class="page-container">
    <div class="companyCreate-section">
      <div class="companyCreate-title">| 基本信息</div>
      <el-form
        class="companyCreate-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
      >
        <el-form-item label="职业名称" prop="name" style="width:100%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="职业描述" style="width:100%">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="职业封面" style="height:200px">
          <Qiniu @tranImge="getImage" :imageUlr="form.image_url" />
        </el-form-item>
        <el-form-item style="width:100%">
          <el-button class="Submit" type="primary" @click="onSubmit"
            >创建职业</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import zhiye from "../gloabl/request/zhiye";
import Qiniu from "../components/qiniu";
export default {
  components: {
    Qiniu
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        image_url: ""
      }
    };
  },
  methods: {
    getImage(img) {
      this.form.image_url = img;
    },
    onSubmit() {
      this.form.created_time = new Date();
      this.form.status = 0;
      zhiye.create(this.form).then(res => {
        if (res.code == 200) {
          this.$router.push({ name: "Zhiye" });
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
.companyCreate-section {
  width: 800px;
  margin: auto;
  padding-top: 40px;
  .companyCreate-from {
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
