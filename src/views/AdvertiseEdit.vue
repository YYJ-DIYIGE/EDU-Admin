<template>
  <div class="page-container">
    <div class="course-section">
      <div class="course-container">
        <div class="form-item">
          <div class="title">| 基本信息</div>
          <div class="course-button">
            <el-button class="Submit" type="primary" @click="onSubmit('form')"
              >修改</el-button
            >
          </div>
        </div>
        <el-form
          class="course-from"
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
        </el-form>
      </div>
    </div>
    <div class="chapters-section">
      <div class="chapters-container">
        <div class="title">| 广告-物料</div>
        <div class="chapters-content">
          <MaterialDraggable :listdata="material" :advertiseId="id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import advertise from "../gloabl/request/advertise";
import MaterialDraggable from "../components/MaterialDraggable";
export default {
  components: {
    MaterialDraggable
  },
  data() {
    return {
      form: {},
      id: null,
      material: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let id = Number(this.$route.query.id);
      this.id = id;
      advertise.editshow(id).then(res => {
        this.form = res.form;
        this.material = res.form.material;
      });
    },
    onSubmit() {
      this.form.updated_time = new Date();
      advertise.update(this.id, this.form).then(res => {
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
.page-container {
  display: flex;
}
.chapters-section {
  flex: 1;
  padding-top: 40px;
  padding-left: 100px;
}
.course-section {
  width: 40%;
  padding-top: 40px;
  padding-left: 20px;
  .course-from {
    padding-top: 20px;
    text-align: justify;
    .el-form-item {
      display: inline-block;
      width: 40%;
    }
  }
}
.course-title {
  line-height: 40px;
}
.chapters-title {
  height: 40px;
  line-height: 40px;
}
.chapters-content {
  padding-top: 10px;
}
</style>
