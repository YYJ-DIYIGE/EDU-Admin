<template>
  <div>
    <el-drawer
      :visible.sync="lock"
      direction="rtl"
      size="35%"
      @close="handleClose"
    >
      <el-form
        class="sections-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
      >
        <el-form-item label="小节名称" prop="name" style="width:100%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="视频地址" prop="name" style="width:100%">
          <el-input v-model="form.video_url"></el-input>
        </el-form-item>
        <el-form-item label="课任务内容" style="height:400px">
          <quill-editor
            v-model="form.content"
            ref="myQuillEditor"
            style="height: 200px;"
          >
          </quill-editor>
        </el-form-item>
        <el-form-item style="width:100%">
          <el-button class="Submit" type="primary" @click="onSubmit"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import sections from "./../gloabl/request/sections";
export default {
  props: {
    sectionsform: Object,
    locks: Boolean
  },
  data() {
    return {
      lock: false,
      form: {
        name: "",
        video_url: "",
        content: ""
      }
    };
  },
  methods: {
    onSubmit() {
      if (!this.form.id) {
        return;
      }
      this.form.updated_time = new Date();
      sections.update(this.form.id, this.form).then(res => {
        if (res.code == 200) {
          this.$parent.callfather();
          setTimeout(() => {
            this.lock = false;
          }, 1000);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    handleClose() {
      this.$emit("losck", false);
    }
  },
  watch: {
    locks: function(newVal) {
      this.lock = newVal;
    },
    sectionsform: function(newVal) {
      this.form = newVal;
    }
  }
};
</script>
<style lang="less" scoped>
.sections-from {
  padding: 0 20px;
}
.form-item {
  display: flex;
  justify-content: space-between;
}
</style>
