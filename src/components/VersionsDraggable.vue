<template>
  <div class="fluid container">
    <div class="col-md-3">
      <draggable
        class="list-group"
        element="div"
        v-model="list"
        :options="dragOptions"
        @end="onEnd"
      >
        <transition-group type="transition" :name="'flip-list'">
          <div
            :class="acctiveClass == index ? 'active' : ''"
            class="list-group-item"
            @click.self="active(index, element.id)"
            v-for="(element, index) in list"
            :key="element.id"
            :data-id="element.id"
          >
            <div class="item-left">
              <div class="item-image">
                <img class="images" src="../assets/qi.png" />
              </div>
              <div class="item-name">{{ element.name }}</div>
            </div>
            <div class="item-operation">
              <el-dropdown trigger="click" class="coures">
                <el-button type="text" class="el-dropdown-link">
                  ···
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="clearfix">
                    <el-button size="mini" @click="handleEdit(element.id)"
                      >编辑</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(element.id)"
                      >删除</el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </transition-group>
        <div class="add-item" slot="footer">
          添加版本 <i class="el-icon-circle-plus-outline" @click="AddItem"></i>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import versions from "../gloabl/request/versions.js";
export default {
  name: "hello",
  components: {
    draggable
  },
  props: {
    listdata: Array,
    project_id: Number
  },
  data() {
    return {
      ops: {},
      acctiveClass: 0,
      list: this.listdata,
      list2: []
    };
  },
  methods: {
    active(index, id) {
      this.acctiveClass = index;
      this.$emit("childFn", id);
    },
    handleEdit(id) {
      let update_time = new Date();
      this.$prompt("请编辑版本名称", "提示", {
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
          versions.update(id, params).then(res => {
            if (res.code == 200) {
              this.$parent.getVersions();
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
    handleDelete(id) {
      versions.delete(id).then(res => {
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
            this.$parent.getVersions();
        }
      });
    },
    AddItem() {
      let created_time = new Date();
      let project_id = this.project_id;
      let sort = this.list.length;
      this.$prompt("请输入名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value || !project_id) {
            return;
          }
          const params = {
            name: value,
            created_time,
            project_id,
            sort
          };
          versions.create(params).then(res => {
            if (res.code == 200) {
              this.$parent.getVersions();
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
      versions.sort(params).then(res => {
        if (res.code == 200) {
          this.$parent.getVersions();
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description"
      };
    }
  },
  watch: {
    listdata: function(newVal) {
      this.list = newVal;
    }
  }
};
</script>

<style lang="less" scoped>
.item-left {
  display: flex;
}
.item-name {
  padding-left: 5px;
}
.add-item {
  text-align: right;
  padding-right: 10px;
}
.item-operation {
  display: inline;
}
.item-image {
  padding-top: 4px;
  .images {
    width: 16px;
    height: 16px;
  }
}

.el-dropdown-link {
  font-size: 18px;
}
.col-md-3 {
  width: 300px;
  min-height: 100px;
  max-height: 500px;
  overflow: auto;
  border: 1px solid;
}
.list-group-item {
  padding: 0 10px;
  display: flex;
  line-height: 40px;
  justify-content: space-between;
}
.list-group-item.active {
  background: #607d8b;
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
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
