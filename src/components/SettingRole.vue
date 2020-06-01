<template>
  <div class="page-container">
    <div class="setting-section">
      <div class="title">| 基本信息</div>
      <el-form
        class="setting-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
      >
        <el-form-item label="名称:" style="width:100%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述:" style="width:100%">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div class="setting-power">
        <div class="title">| 权限信息</div>
        <div class="setting-power-list">
          <div
            class="power-item"
            v-for="(item, index) in permissionGroup"
            :key="index"
          >
            <div class="power-item-name">{{ item.name }}：</div>
            <div class="power-item-option">
              <el-checkbox-group v-model="form.permission_slug" size="medium">
                <el-checkbox
                  :label="data.slug"
                  v-for="(data, indes) in item.permissions"
                  :key="indes"
                  >{{ data.name }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <el-button v-if="form.id" class="Submit" type="primary" @click="onSubmit"
        >保存</el-button
      >
      <el-button v-else class="Submit" type="primary" @click="onSubmit"
        >创建</el-button
      >
    </div>
  </div>
</template>
<script>
import Roles from "../gloabl/request/roles";
export default {
  props: {
    roleform: Object
  },
  data() {
    return {
      permissionGroup: [],
      form: {
        name: "",
        desc: "",
        permission_slug: []
      }
    };
  },
  methods: {
    onSubmit() {
      if (this.form.id) {
        this.form.updated_time = new Date();
        Roles.update(this.form.id, this.form).then(res => {
          if (res.code == 200) {
            this.$router.push({ name: "SettingRole" });
          } else {
            this.$message.err(res.msg);
          }
        });
      } else {
        this.form.created_time = new Date();
        Roles.create(this.form).then(res => {
          if (res.code == 200) {
            this.$router.push({ name: "SettingRole" });
          } else {
            this.$message.err(res.msg);
          }
        });
      }
    }
  },
  created() {
    Roles.permissions().then(res => {
      this.permissionGroup = res.permissionGroup;
    });
  },
  watch: {
    roleform: function(newVal) {
      this.form = newVal;
    }
  }
};
</script>
<style lang="less" scoped>
.setting-power-list {
  margin-top: 20px;
}
.power-item {
  margin-top: 10px;
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
  font-size: 18px;
}
.power-item-option {
  padding-top: 2px;
}
.setting-section {
  width: 800px;
  margin: auto;
  padding-top: 40px;
  .setting-from {
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
