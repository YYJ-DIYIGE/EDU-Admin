<template>
  <div class="page-container">
    <div class="course-section">
      <div class="course-container">
        <div class="form-item">
          <div class="title">| 基本信息</div>
          <div class="course-button">
            <el-button class="Submit" type="primary" @click="onSubmit('form')"
              >修改课程</el-button
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
          <div class="form-item">
            <el-form-item label="课程名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
              <el-input v-model="form.short_name"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="课程提示" style="width:100%">
            <el-input v-model="form.tips"></el-input>
          </el-form-item>
          <el-form-item label="课程描述" style="width:100%">
            <el-input v-model="form.description"></el-input>
          </el-form-item>
          <div class="form-item">
            <el-form-item label="课程封面" style="height:200px">
              <Qiniu @tranImge="getImage" :imageUlr="form.image_url" />
            </el-form-item>
            <el-form-item
              style="width:100%;padding-left:100px"
              label="课程状态"
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
    <div class="chapters-section">
      <div class="chapters-container">
        <div class="title">| 课程章节</div>
        <div class="chapters-content">
          <ComponentsChapters :chaptersdata="Chapterdata" :course_id="id" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import course from "../gloabl/request/course";
import Chapters from "../gloabl/request/chapters";
import Qiniu from "../components/qiniu";
import ComponentsChapters from "../components/ChaptersSort";
export default {
  components: {
    Qiniu,
    ComponentsChapters
  },
  data() {
    return {
      form: {
        name: "",
        short_name: "",
        tips: "",
        description: "",
        image_url: ""
      },
      id: null,
      Chapterdata: []
    };
  },
  created() {
    this.getcourse();
    this.getChapters();
  },
  methods: {
    getChapters() {
      Chapters.index({ course_id: this.id }).then(res => {
        this.Chapterdata = res.Chapter;
      });
    },
    getcourse() {
      let id = Number(this.$route.query.id);
      this.id = id;
      course.editshow(id).then(res => {
        this.form = res.CoursesEdit;
        this.form.status = Boolean(this.form.status);
      });
    },
    getImage(img) {
      this.form.image_url = img;
    },
    onSubmit() {
      this.form.updated_time = new Date();
      this.form.status = Number(this.form.status);
      course.update(this.id, this.form).then(res => {
        if (res.code == 200) {
          this.getcourse();
          this.$router.push({ name: "Course" });
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
</style>
