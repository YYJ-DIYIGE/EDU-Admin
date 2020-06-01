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
                      <el-button size="mini" @click="chaptersEdit(element.id)"
                        >编辑</el-button
                      >
                    </el-dropdown-item>
                    <el-dropdown-item class="clearfix">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="chaptersDelete(element.id)"
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
              v-model="element.sections"
              @end="endtaks"
            >
              <transition-group type="transition" :name="'flip-list'">
                <div
                  class="item-list-group-item"
                  v-for="item in element.sections"
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
                          <el-button size="mini" @click="sectionsEdit(item.id)"
                            >编辑</el-button
                          >
                        </el-dropdown-item>
                        <el-dropdown-item class="clearfix">
                          <el-button
                            size="mini"
                            type="danger"
                            @click="sectionsDelete(item.id)"
                            >删除</el-button
                          >
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </div>
              </transition-group>
              <div class="add-border" slot="footer">
                添加节
                <i
                  class="el-icon-circle-plus-outline"
                  @click="Addsections(element.id, index)"
                ></i>
              </div>
            </draggable>
          </div>
        </transition-group>
        <div class="add-item" slot="footer">
          添加章
          <i class="el-icon-circle-plus-outline" @click="Addchapters"></i>
        </div>
      </draggable>
    </div>
    <ComponentSections
      :locks="lock"
      :sectionsform="sectionsform"
      @losck="losck"
    />
  </div>
</template>

<script>
import draggable from "vuedraggable";
import chapters from "./../gloabl/request/chapters";
import sections from "./../gloabl/request/sections";
import ComponentSections from "./SectionsEdit.vue";
export default {
  name: "hello",
  components: {
    draggable,
    ComponentSections
  },
  props: {
    chaptersdata: Array,
    course_id: Number
  },
  data() {
    return {
      list: this.chaptersdata,
      sectionsform: {},
      lock: false
    };
  },
  methods: {
    endtaks() {
      this.updateSort();
    },
    chaptersEdit(id) {
      let update_time = new Date();
      this.$prompt("请编辑章名称", "提示", {
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
          chapters.update(id, params).then(res => {
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
    chaptersDelete(id) {
      chapters.delete(id).then(res => {
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
    sectionsEdit(id) {
      sections.editshow(id).then(res => {
        this.sectionsform = res.SectionsEdit;
      });
      this.lock = true;
    },
    sectionsDelete(id) {
      sections.delete(id).then(res => {
        if (res.code == 200) {
          this.callfather();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    Addsections(id, index) {
      let sort = this.list[index].sections.length;
      let chapter_id = id;
      let created_time = new Date();
      this.$prompt("请输入节名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value || !chapter_id) {
            this.$message({
              message: "缺少参数",
              type: "warning"
            });
            return;
          }
          const params = {
            name: value,
            created_time,
            chapter_id,
            sort
          };
          sections.create(params).then(res => {
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
    Addchapters() {
      let course_id = this.course_id;
      let created_time = new Date();
      let sort = this.list.length;
      this.$prompt("请输入章名称", "提示", {
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
            course_id,
            sort
          };
          chapters.create(params).then(res => {
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
      chapters.sort(params).then(res => {
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
      this.$parent.getChapters();
    }
  },
  watch: {
    chaptersdata: function(newVal) {
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
