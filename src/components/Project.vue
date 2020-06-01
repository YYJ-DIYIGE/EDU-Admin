<template>
  <div class="page-container">
    <div class="project-section">
      <div class="title">| 基本信息</div>
      <el-form
        class="project-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="项目名称" prop="name" style="width:100%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目介绍" style="width:100%" prop="desc">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="项目封面" style="height:200px">
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
import project from "../gloabl/request/project";
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
        desc: "",
        content: "",
        status: 0,
        image: "",
        created_time: "",
        update_time: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        desc: [{ required: true, message: "请输入项目介绍", trigger: "blur" }]
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
      this.form.image = img;
    },
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          if (this.form.id) {
            this.form.update_time = new Date();
            project.update(this.form.id, this.form).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "Project" });
              } else {
                this.$message.err(res.msg);
              }
            });
          } else {
            this.form.created_time = new Date();
            project.create(this.form).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "Project" });
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
.form-item {
  display: flex;
  justify-content: space-between;
}
.project-section {
  width: 800px;
  margin: auto;
  padding-top: 40px;
  .project-from {
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
