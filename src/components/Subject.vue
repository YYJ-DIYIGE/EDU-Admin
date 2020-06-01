<template>
  <div class="page-container">
    <div class="subject-section">
      <div class="title">| 基本信息</div>
      <el-form
        class="subject-from"
        label-position="top"
        label-width="250px"
        status-icon
        :model="form"
      >
        <el-form-item label="题目" prop="name" style="width:100%">
          <el-input v-model="form.stem"></el-input>
        </el-form-item>
        <div class="form-item">
          <el-form-item label="技能">
            <el-select v-model="form.stack_id" placeholder="请选择">
              <el-option
                v-for="item in stacks"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="等级" prop="socialNumber">
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
        </div>
        <el-form-item label="选项" style="width:100%">
          <div
            v-for="(item, index) in form.option"
            :key="index"
            class="form-item"
          >
            <el-input v-model="item.title" class="option-input"></el-input>
            <div slot="append" class="delInput" @click="delInput(index)">X</div>
          </div>
          <div class="Add-input" @click="AddInput">+</div>
        </el-form-item>
        <el-form-item label="答案" style="width:100%">
          <el-radio-group v-model="form.currect">
            <el-radio
              :label="item"
              v-for="(item, index) in form.option.length"
              :key="item"
              >{{ options[index].value }}</el-radio
            >
          </el-radio-group>
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
import subject from "../gloabl/request/subject";
import stacks from "../gloabl/request/stacks";
export default {
  props: {
    formdata: Object
  },

  data() {
    return {
      stacks: [],
      form: {
        stem: "",
        stacks_id: "",
        level: "",
        option: [{ title: "" }, { title: "" }, { title: "" }],
        currect: 1
      },
      levelArr: [
        {
          value: 1,
          label: "入门"
        },
        {
          value: 2,
          label: "初阶"
        },
        {
          value: 3,
          label: "中阶"
        },
        {
          value: 4,
          label: "高阶"
        }
      ],
      options: [
        { value: "A" },
        { value: "B" },
        { value: "C" },
        { value: "D" },
        { value: "E" },
        { value: "F" },
        { value: "G" }
      ]
    };
  },
  created() {
    stacks.index().then(res => {
      this.stacks = res;
    });
  },
  watch: {
    formdata: function(newVal) {
      this.form = newVal;
    }
  },
  methods: {
    delInput(index) {
      this.form.option.splice(index, 1);
    },
    AddInput() {
      this.form.option.push({ title: "" });
    },
    onSubmit() {
      if (this.form.id) {
        this.form.updated_time = new Date();
        subject.update(this.form.id, this.form).then(res => {
          if (res.code == 200) {
            this.$router.push({ name: "Subject" });
          } else {
            this.$message.err(res.message);
          }
        });
      } else {
        this.form.created_time = new Date();
        subject.create(this.form).then(res => {
          if (res.code == 200) {
            this.$router.push({ name: "Subject" });
          } else {
            this.$message.err(res.message);
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
.subject-section {
  width: 800px;
  margin: auto;
  padding-top: 40px;
  .subject-from {
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
