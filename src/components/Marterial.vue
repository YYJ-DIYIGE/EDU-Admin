<template>
  <div class="page-container">
    <div class="material-section">
      <div class="title">| 基本信息</div>
      <el-form
        class="material-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
        :rules="rules"
        ref="form"
      >
        <el-form-item label="物料名称" prop="name" style="width:100%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接" style="width:100%" prop="link">
          <el-input v-model="form.link"></el-input>
        </el-form-item>
        <el-form-item label="打开窗口" style="width:100%" prop="window">
          <el-select v-model="form.window" placeholder="请选择">
            <el-option
              v-for="item in window"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物料图片" style="height:200px">
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
import material from "../gloabl/request/material";
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
      window: [
        {
          value: "_self",
          label: "原窗口"
        },
        {
          value: "_barget",
          label: "新窗口"
        }
      ],
      form: {
        name: "",
        link: "",
        window: "",
        image_url: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        link: [{ required: true, message: "请输入物料链接", trigger: "blur" }],
        window: [{ required: true, message: "请选择打开窗口", trigger: "blur" }]
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
            material.update(this.form.id, this.form).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "Material" });
              } else {
                this.$message.err(res.msg);
              }
            });
          } else {
            this.form.created_time = new Date();
            material.create(this.form).then(res => {
              if (res.code == 200) {
                this.$router.push({ name: "Material" });
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
.material-section {
  width: 800px;
  margin: auto;
  padding-top: 40px;
  .material-from {
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
