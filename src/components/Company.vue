<template>
  <div class="page-container">
    <div class="company-section">
      <div class="title">| 基本信息</div>
      <el-form
        class="company-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
        :rules="rules"
        ref="form"
      >
        <div class="form-item">
          <el-form-item label="企业全称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="企业短称">
            <el-input v-model="form.abridge"></el-input>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="企业口号">
            <el-input v-model="form.slogan"></el-input>
          </el-form-item>
          <el-form-item label="社会编号" prop="socialNumber">
            <el-input v-model="form.socialNumber"></el-input>
          </el-form-item>
        </div>
        <div class="form-item">
          <el-form-item label="联系人名称" prop="boss">
            <el-input v-model="form.boss"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop="phone">
            <el-input v-model="form.phone" type="number"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="企业介绍" style="width:100%">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="企业封面" style="height:200px">
          <Qiniu @tranImge="getImage" :imageUlr="form.image" />
        </el-form-item>
        <el-form-item style="width:100%">
          <el-button
            v-if="form.id"
            class="Submit"
            type="primary"
            @click="onSubmit('form')"
            >立即保存</el-button
          >
          <el-button
            v-else
            class="Submit"
            type="primary"
            @click="onSubmit('form')"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import company from "../gloabl/request/company";
import Qiniu from "./qiniu";
export default {
  props: {
    formdata: Object,
    ids: Number
  },
  components: {
    Qiniu
  },
  data() {
    return {
      form: {
        name: "",
        abridge: "",
        slogan: "",
        socialNumber: "",
        boss: "",
        phone: "",
        desc: "",
        image: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入联系号码", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        socialNumber: [
          { required: true, message: "请输入社会编号", trigger: "blur" }
        ],
        boss: [{ required: true, message: "请输入联系人", trigger: "blur" }]
      },
      id: this.ids
    };
  },
  watch: {
    formdata: function(newVal) {
      this.form = newVal;
    }
  },
  methods: {
    getImage(img) {
      this.form.image = img;
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.form.id) {
            this.form.update_time = new Date();
            company.update(this.form.id, this.form).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "companyList" });
              } else {
                this.$message.err(res.msg);
              }
            });
          } else {
            this.form.created_time = new Date();
            company.create(this.form).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "companyList" });
              } else {
                this.$message.err(res.msg);
              }
            });
          }
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
.company-section {
  width: 800px;
  margin: auto;
  padding-top: 40px;
  .company-from {
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
