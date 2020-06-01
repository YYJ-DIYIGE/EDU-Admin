<template>
  <div class="page-container">
    <div class="manager-section">
      <div class="title">| 基本信息</div>
      <el-form
        class="manager-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
        :rules="passwordRules"
        ref="form"
      >
        <el-form-item label="姓名" prop="name" style="width:100%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone" style="width:100%">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width:100%">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="角色" style="width:50%">
          <el-select v-model="form.role_id" placeholder="请选择">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:100%">
          <el-button
            v-if="form.id"
            class="Submit"
            type="primary"
            @click="onSubmit"
            >立即保存</el-button
          >
          <el-button v-else class="Submit" type="primary" @click="onSubmit"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import manage from "../gloabl/request/manage";
import roles from "../gloabl/request/roles";
export default {
  props: {
    formdata: Object
  },

  data() {
    return {
      roles: [],
      form: {
        name: "",
        phone: "",
        password: "",
        role_id: ""
      },
      passwordRules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        name: [{ required: true }]
      }
    };
  },
  created() {
    roles.index().then(res => {
      this.roles = res;
    });
  },
  watch: {
    formdata: function(newVal) {
      this.form = newVal;
    }
  },
  methods: {
    onSubmit() {
      if (this.form.id) {
        this.form.updated_time = new Date();
        manage.update(this.form.id, this.form).then(res => {
          if (res.code == 200) {
            this.$router.push({ name: "SettingManager" });
          } else {
            this.$message.err(res.msg);
          }
        });
      } else {
        this.form.created_time = new Date();
        manage.create(this.form).then(res => {
          if (res.code == 200) {
            this.$router.push({ name: "SettingManager" });
          } else {
            this.$message.err(res.msg);
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.delInput {
  height: 40px;
  width: 40px;
  background: #000;
  border-radius: 50%;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  color: aliceblue;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 5px;
}
.form-item {
  display: flex;
}
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
.manager-section {
  width: 800px;
  margin: auto;
  padding-top: 40px;
  .manager-from {
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
.option-input {
  margin-top: 10px;
}
.Add-input {
  width: 80px;
  height: 80px;
  font-size: 45px;
  line-height: 80px;
  text-align: center;
  cursor: pointer;
}
</style>
