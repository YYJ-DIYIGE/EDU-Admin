<template>
  <div class="fluid container">
    <div class="col-md-3">
      <draggable class="list-group" element="div" v-model="list" @end="onEnd">
        <transition-group type="transition" :name="'flip-list'">
          <div
            class="list-group-item"
            v-for="(element, index) in list"
            :key="element.id"
            :data-id="element.id"
          >
            <div class="item-left">
              <div class="item-image">
                <img class="images" src="../assets/qi.png" />
                <div class="item-name">{{ element.name }}</div>
              </div>
              <div class="item-operation">
                <el-dropdown trigger="click" class="coures">
                  <el-button type="text" class="el-dropdown-link">
                    ···
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="clearfix">
                      <el-button size="mini" @click="ZhiyePathEdit(element.id)"
                        >编辑</el-button
                      >
                    </el-dropdown-item>
                    <el-dropdown-item class="clearfix">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="ZhiyePathDelete(element.id)"
                        >删除</el-button
                      >
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <draggable
              class="item-list-group"
              element="div"
              v-model="element.Course"
              @end="endSub"
            >
              <transition-group type="transition" :name="'flip-list'">
                <div
                  class="item-list-group-item"
                  v-for="item in element.Course"
                  :key="item.zhiyeCourses_id"
                  :data-id="item.zhiyeCourses_id"
                >
                  <div class="item-left">
                    <div class="item-name">{{ item.name }}</div>
                  </div>
                  <div class="item-operation">
                    <el-dropdown trigger="click" class="coures">
                      <el-button type="text" class="el-dropdown-link">
                        ···
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item class="clearfix">
                          <el-button
                            size="mini"
                            @click="zhiyeCoursesEdit(item.zhiyeCourses_id)"
                            >编辑</el-button
                          >
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="zhiyeCoursesDelete(item.zhiyeCourses_id)"
                            >删除</el-button
                          >
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
              </transition-group>
              <div class="add-border" slot="footer">
                添加关联课程
                <i
                  class="el-icon-circle-plus-outline"
                  @click="AddzhiyeCourses(element.id, index)"
                ></i>
              </div>
            </draggable>
          </div>
        </transition-group>
        <div class="add-item" slot="footer">
          添加职业路径
          <i class="el-icon-circle-plus-outline" @click="AddZhiyePath"></i>
        </div>
      </draggable>
    </div>
    <div class="EditPath">
      <el-dialog title="修改职业路径" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="路径名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="路径描述" :label-width="formLabelWidth">
            <el-input v-model="form.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onUpdate">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ZhiyePath from "./../gloabl/request/zhiyePath";
import ZhiyeCourses from "./../gloabl/request/zhiyeCourses";
export default {
  name: "hello",
  components: {
    draggable
  },
  props: {
    ZhiyePathdata: Array,
    zhiye_id: Number
  },
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      form: {
        name: "",
        description: ""
      },
      listSet: [],
      formLabelWidth: "120px"
    };
  },
  methods: {
    onUpdate() {
      this.form.updated_time = new Date();
      ZhiyePath.update(this.form.id, this.form).then(res => {
        if (res.code == 200) {
          this.callfather();
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    endSub() {
      this.updateSort();
    },
    ZhiyePathEdit(id) {
      ZhiyePath.editShow(id).then(res => {
        this.form = res.ZhiyePath;
      });
      this.dialogFormVisible = true;
    },
    ZhiyePathDelete(id) {
      ZhiyePath.delete(id).then(res => {
        switch (res.code) {
          case 401:
            this.$message({
              message: res.message,
              type: "warning"
            });
            break;
          case 404:
            this.$message.error(res.message);
            break;
          default:
            this.$message({
              message: res.message,
              type: "success"
            });
            this.callfather();
        }
      });
    },
    zhiyeCoursesEdit(id) {
      this.$prompt("请输入课程ID", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value || !id) {
            this.$message({
              message: "缺少参数",
              type: "warning"
            });
            return;
          }
          let course_id = value;
          ZhiyeCourses.update(id, { course_id }).then(res => {
            if (res.code == 200) {
              this.callfather();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    zhiyeCoursesDelete(id) {
      ZhiyeCourses.delete(id).then(res => {
        if (res.code == 200) {
          this.callfather();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    AddzhiyeCourses(id, index) {
      let sort = this.list[index].Course.length;
      let path_id = id;
      let zhiye_id = this.zhiye_id;
      this.$prompt("请输入课程ID", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value || !path_id) {
            this.$message({
              message: "缺少参数",
              type: "warning"
            });
            return;
          }
          const params = {
            course_id: Number(value),
            path_id,
            zhiye_id,
            sort
          };
          ZhiyeCourses.create(params).then(res => {
            if (res.code == 200) {
              this.callfather();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    AddZhiyePath() {
      let zhiye_id = this.zhiye_id;
      let created_time = new Date();
      let sort = this.list.length;
      this.$prompt("请输入路径名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value) {
            this.$message({
              message: "错误",
              type: "warning"
            });
            return;
          }
          const params = {
            name: value,
            created_time,
            zhiye_id,
            sort
          };
          ZhiyePath.create(params).then(res => {
            if (res.code == 200) {
              this.callfather();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    onEnd() {
      this.updateSort();
    },
    updateSort() {
      let params = this.list;
      ZhiyePath.sort(params).then(res => {
        if (res.code == 200) {
          this.callfather();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    callfather() {
      this.$parent.getZhiyePath();
    }
  },
  watch: {
    ZhiyePathdata: function(newVal) {
      this.list = newVal;
      this.listSet = newVal;
    }
  }
};
</script>

<style lang="less" scoped>
.item-list-group span:first-of-type {
  display: block;
  width: 100%;
}
.add-border {
  text-align: right;
  padding-right: 6px;
}
.item-list-group-item {
  display: flex;
  justify-content: space-between;
}
.item-left {
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
}
.item-name {
  line-height: 44px;
  padding: 0 5px;
}
.add-item {
  border: 1px solid;
  margin-top: 6px;
  text-align: right;
  padding-right: 10px;
}
.item-operation {
  display: inline;
  padding-right: 11px;
}
.item-image {
  display: flex;
  padding-top: 4px;
  .images {
    padding-top: 13px;
    width: 16px;
    height: 16px;
  }
}

.el-dropdown-link {
  font-size: 18px;
}
.col-md-3 {
  width: 350px;
  max-height: 500px;
  overflow: auto;
}
.list-group-item {
  margin-top: 10px;
  min-height: 100px;
  max-height: 250px;
  overflow: auto;
  border: 1px solid;
  line-height: 40px;
  justify-content: space-between;
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  padding-right: 10px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
