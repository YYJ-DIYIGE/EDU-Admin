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
                      <el-button size="mini" @click="StoriesEdit(element.id)"
                        >编辑</el-button
                      >
                    </el-dropdown-item>
                    <el-dropdown-item class="clearfix">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="StoriesDelete(element.id)"
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
              v-model="element.tasks"
              @end="endtaks"
            >
              <transition-group type="transition" :name="'flip-list'">
                <div
                  class="item-list-group-item"
                  v-for="item in element.tasks"
                  :key="item.id"
                  :data-id="item.id"
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
                          <el-button size="mini" @click="TasksEdit(item.id)"
                            >编辑</el-button
                          >
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="TasksDelete(item.id)"
                            >删除</el-button
                          >
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
              </transition-group>
              <div class="add-border" slot="footer">
                添加任务
                <i
                  class="el-icon-circle-plus-outline"
                  @click="AddTasks(element.id, index)"
                ></i>
              </div>
            </draggable>
          </div>
        </transition-group>
        <div class="add-item" slot="footer">
          添加故事
          <i class="el-icon-circle-plus-outline" @click="AddStories"></i>
        </div>
      </draggable>
    </div>
    <Drawer :locks="lock" :tasksform="tasksEdit" @losck="losck" />
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Stories from "./../gloabl/request/stories";
import Tasks from "./../gloabl/request/tasks";
import Drawer from "./Drawer.vue";
export default {
  name: "hello",
  components: {
    draggable,
    Drawer
  },
  props: {
    Storiesdata: Array,
    project_id: Number,
    versions_id: Number
  },
  data() {
    return {
      list: this.Storiesdata,
      tasksEdit: {},
      lock: false
    };
  },
  methods: {
    endtaks() {
      this.updateSort();
    },
    StoriesEdit(id) {
      let update_time = new Date();
      this.$prompt("请编辑故事名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value || !id) {
            return;
          }
          const params = {
            name: value,
            update_time
          };
          Stories.update(id, params).then(res => {
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
    StoriesDelete(id) {
      Stories.delete(id).then(res => {
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
    TasksEdit(id) {
      Tasks.editshow(id).then(res => {
        this.tasksEdit = res.TasksEdit;
      });
      this.lock = true;
    },
    TasksDelete(id) {
      Tasks.delete(id).then(res => {
        if (res.code == 200) {
          this.callfather();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    AddTasks(id, index) {
      let sort = this.list[index].tasks.length;
      let story_id = id;
      let versions_id = this.versions_id;
      let project_id = this.project_id;
      let created_time = new Date();
      let status = 0;
      this.$prompt("请输入任务名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value || !versions_id || !project_id || !story_id) {
            this.$message({
              message: "缺少参数",
              type: "warning"
            });
            return;
          }
          const params = {
            name: value,
            created_time,
            versions_id,
            project_id,
            story_id,
            status,
            sort
          };
          Tasks.create(params).then(res => {
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
    AddStories() {
      let versions_id = this.versions_id;
      let created_time = new Date();
      let sort = this.list.length;
      this.$prompt("请输入故事名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value || !versions_id) {
            this.$message({
              message: "请选择版本",
              type: "warning"
            });
            return;
          }
          const params = {
            name: value,
            created_time,
            versions_id,
            sort
          };
          Stories.create(params).then(res => {
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
      Stories.sort(params).then(res => {
        if (res.code == 200) {
          this.callfather();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    losck(close) {
      this.lock = close;
    },
    callfather() {
      this.$parent.getStories(this.versions_id);
    }
  },
  watch: {
    Storiesdata: function(newVal) {
      this.list = newVal;
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
  padding: 0 10px;
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
// ::-webkit-scrollbar {
//   width: 10px; /*对垂直流动条有效*/
//   height: 10px; /*对水平流动条有效*/
// }

// /*定义滚动条的轨道颜色、内阴影及圆角*/
// ::-webkit-scrollbar-track {
//   box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   background-color: rosybrown;
//   border-radius: 3px;
// }

// /*定义滑块颜色、内阴影及圆角*/
// ::-webkit-scrollbar-thumb {
//   border-radius: 7px;
//   box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
//   background-color: #bba9a9;
// }

// /*定义右下角汇合处的样式*/
// ::-webkit-scrollbar-corner {
//   background: khaki;
// }
</style>
