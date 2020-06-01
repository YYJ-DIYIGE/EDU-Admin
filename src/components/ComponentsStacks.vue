<template>
  <div class="page-container">
    <div class="stacks-section">
      <div class="title">| 基本信息</div>
      <el-form
        class="stacks-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
        :rules="rules"
        ref="form"
      >
        <div class="form-item">
          <el-form-item label="技能全称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="技能提示">
            <el-input v-model="form.tag_line"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="技能介绍" style="width:100%">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="技能封面" style="height:200px">
          <Qiniu @tranImge="getImage" :imageUlr="form.image_url" />
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
import stacks from "../gloabl/request/stacks";
import Qiniu from "./qiniu";
export default {
  props: {
    formdata: Object
  },
  components: {
    Qiniu
  },
  data() {
    return {
      form: {
        name: "",
        tag_line: "",
        description: "",
        image_url: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  watch: {
    formdata: function(newVal) {
      this.form = newVal;
    }
  },
  methods: {
    getImage(img) {
      this.form.image_url = img;
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.form.id) {
            this.form.updated_time = new Date();
            stacks.update(this.form.id, this.form).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "Stacks" });
              } else {
                this.$message.err(res.msg);
              }
            });
          } else {
            this.form.created_time = new Date();
            stacks.create(this.form).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "Stacks" });
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
.stacks-section {
  width: 800px;
  margin: auto;
  padding-top: 40px;
  .stacks-from {
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
