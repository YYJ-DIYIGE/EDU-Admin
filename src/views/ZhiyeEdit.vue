<template>
  <div class="page-container">
    <div class="zhiye-section">
      <div class="zhiye-container">
        <div class="form-item">
          <div class="zhiye-title">| 基本信息</div>
          <div class="zhiye-button">
            <el-button class="Submit" type="primary" @click="onSubmit('form')"
              >修改</el-button
            >
          </div>
        </div>
        <el-form
          class="zhiye-from"
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
          <div class="form-item">
            <el-form-item label="职业封面" style="height:200px">
              <Qiniu @tranImge="getImage" :imageUlr="form.image_url" />
            </el-form-item>
            <el-form-item
              style="width:100%;padding-left:100px"
              label="职业状态"
            >
              <el-switch
                v-model="form.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="zhiyePath-section">
      <div class="zhiyePath-container">
        <div class="zhiyePath-title">| 职业路径</div>
        <div class="zhiyePath-content">
          <ComponentsZhiyePath :ZhiyePathdata="Pathdata" :zhiye_id="id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Zhiye from "../gloabl/request/zhiye";
import ZhiyePath from "../gloabl/request/zhiyePath";
import Qiniu from "../components/qiniu";
import ComponentsZhiyePath from "../components/ZhiyePathSort";
export default {
  components: {
    Qiniu,
    ComponentsZhiyePath
  },
  data() {
    return {
      form: {
        name: "",
        status: null,
        description: "",
        image_url: ""
      },
      id: null,
      Pathdata: []
    };
  },
  created() {
    this.getZhiye();
    this.getZhiyePath();
  },
  methods: {
    getZhiyePath() {
      ZhiyePath.index({ zhiye_id: this.id }).then(res => {
        this.Pathdata = res.ZhiyePaths;
      });
    },
    getZhiye() {
      let id = Number(this.$route.query.id);
      this.id = id;
      Zhiye.editshow(id).then(res => {
        this.form = res.ZhiyeEdit;
        this.form.status = Boolean(this.form.status);
      });
    },
    getImage(img) {
      this.form.image_url = img;
    },
    onSubmit() {
      this.form.updated_time = new Date();
      this.form.status = Number(this.form.status);
      Zhiye.update(this.id, this.form).then(res => {
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
.page-container {
  display: flex;
}
.zhiyePath-section {
  flex: 1;
  padding-top: 40px;
  padding-left: 100px;
}
.zhiye-section {
  width: 40%;
  padding-top: 40px;
  padding-left: 20px;
  .zhiye-from {
    padding-top: 20px;
    text-align: justify;
    .el-form-item {
      display: inline-block;
      width: 40%;
    }
  }
}
.zhiye-title {
  line-height: 40px;
}
.zhiyePath-title {
  height: 40px;
  line-height: 40px;
}
</style>
