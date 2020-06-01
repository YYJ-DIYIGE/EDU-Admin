<template>
  <div class="page-container">
    <div class="manage-section">
      <el-button
        class="manage-created"
        type="primary"
        plain
        @click="createManage"
        >创建管理员</el-button
      >
      <div class="manage-list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="id" width="100"> </el-table-column>
          <el-table-column prop="name" label="姓名" width="350">
          </el-table-column>
          <el-table-column prop="roles" label="角色" width="280" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-dropdown trigger="click" class="coures">
                <span class="el-dropdown-link">
                  ...
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="clearfix">
                    <el-button size="mini" @click="handleEdit(scope.row)"
                      >编辑</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.row)"
                      >删除</el-button
                    >
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import manage from "../gloabl/request/manage";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getManage();
  },
  methods: {
    getManage() {
      manage.index().then(res => {
        this.tableData = res;
      });
    },
    handleEdit(row) {
      let id = row.id;
      this.$router.push({ path: "/setting/manager/edit/" + id, query: { id } });
    },
    handleDelete(row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          manage.delete(id).then(res => {
            switch (res.code) {
              case 404:
                this.$message.error(res.message);
                break;
              default:
                this.$message({
                  message: res.msg,
                  type: "success"
                });
                this.getmanage();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    createManage() {
      this.$router.push({ name: "SettingManagerCreate" });
    }
  }
};
</script>
<style lang="less" scoped>
.manage-section {
  padding: 10px 20px;
}
.manage-list {
  padding-top: 20px;
}
.el-dropdown {
  cursor: pointer;
}
.status {
  width: 70px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin: 0 auto;
  background: chartreuse;
  text-shadow: 1px 1px 1px #000, -1px -1px 1px #fff;
  background-color: #3bb3e0;
  font-family: "Open Sans", sans-serif;
  font-size: 12px;
  color: #fff;
  border: solid 1px #186f8f;
}
</style>
