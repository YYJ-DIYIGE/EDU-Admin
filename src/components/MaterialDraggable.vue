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
            class="list-group-item"
            v-for="element in list"
            :key="element._id"
            :data-id="element.id"
          >
            <div class="item-left">
              <div class="item-image">
                <img class="images" src="../assets/qi.png" />
              </div>
              <div class="item-name">{{ element._id }}-{{ element.name }}</div>
            </div>
            <div class="item-operation">
              <el-dropdown trigger="click" class="coures">
                <el-button type="text" class="el-dropdown-link">
                  ···
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="clearfix">
                    <el-button size="mini" @click="handleEdit(element._id)"
                      >编辑</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(element._id)"
                      >删除</el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </transition-group>
        <div class="add-item" slot="footer">
          添加物料 <i class="el-icon-circle-plus-outline" @click="AddItem"></i>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import advertiseMaterial from "../gloabl/request/advertiseMaterial";
export default {
  name: "hello",
  components: {
    draggable
  },
  props: {
    listdata: Array,
    advertiseId: Number
  },
  data() {
    return {
      list: [],
      advertise_id: this.advertiseId
    };
  },
  methods: {
    handleEdit(id) {
      this.$prompt("请编辑物料ID", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value || !id) {
            return;
          }
          const params = {
            material_id: value
          };
          advertiseMaterial.update(id, params).then(res => {
            if (res.code == 200) {
              this.$parent.getList();
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
      advertiseMaterial.delete(id).then(res => {
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
            this.updateSort();
        }
      });
    },
    AddItem() {
      let advertise_id = this.advertise_id;
      let sort = this.list.length;
      this.$prompt("请输入名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (!value || !advertise_id) {
            return;
          }
          const params = {
            material_id: value,
            advertise_id,
            sort
          };
          advertiseMaterial.create(params).then(res => {
            if (res.code == 200) {
              this.$parent.getList();
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
      advertiseMaterial.sort(params).then(res => {
        if (res.code == 200) {
          this.$parent.getList();
        } else {
          this.$message.error(res.message);
        }
      });
    }
  },
  computed: {
    dragOptions() {
      return {
        group: "description"
      };
    }
  },
  watch: {
    listdata: function(newVal) {
      this.list = newVal;
      console.log(newVal);
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
  cursor: pointer;
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
  width: 90%;
  min-height: 100px;
  max-height: 500px;
  overflow: auto;
}
.list-group-item {
  padding: 0 10px;
  display: flex;
  line-height: 40px;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid darkgrey;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
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
