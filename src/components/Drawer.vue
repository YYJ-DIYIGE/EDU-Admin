<template>
  <div>
    <el-drawer
      :visible.sync="lock"
      direction="rtl"
      size="35%"
      @close="handleClose"
    >
      <el-form
        class="Tasks-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
      >
        <el-form-item label="任务名称" prop="name" style="width:100%">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <div class="form-item">
          <el-form-item label="任务难度" prop="name">
            <el-select v-model="form.level" placeholder="请选择">
              <el-option
                v-for="item in levelArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="任务平台">
            <el-select v-model="form.platform" placeholder="请选择">
              <el-option
                v-for="item in platArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
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
import Tasks from "./../gloabl/request/tasks";
export default {
  props: {
    tasksform: Object,
    locks: Boolean
  },
  data() {
    return {
      lock: false,
      form: {
        name: "",
        level: null,
        platform: null,
        content: ""
      },
      levelArr: [
        {
          value: 1,
          label: "入门"
        },
        {
          value: 2,
          label: "初级"
        },
        {
          value: 3,
          label: "中级"
        },
        {
          value: 4,
          label: "高级"
        }
      ],
      platArr: [
        {
          value: 1,
          label: "API"
        },
        {
          value: 2,
          label: "前端"
        },
        {
          value: 3,
          label: "后台"
        },
        {
          value: 4,
          label: "小程序"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      if (!this.form.id) {
        return;
      }
      this.form.update_time = new Date();
      Tasks.update(this.form.id, this.form).then(res => {
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
    tasksform: function(newVal) {
      this.form = newVal;
    }
  }
};
</script>
<style lang="less" scoped>
.Tasks-from {
  padding: 0 20px;
}
.form-item {
  display: flex;
  justify-content: space-between;
}
</style>
