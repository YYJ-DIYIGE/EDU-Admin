<template>
  <div class="page-container">
    <div class="advertise-section">
      <el-button class="advertise-created" type="primary" plain @click="create"
        >创建广告</el-button
      >
      <div class="advertise-list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="id" width="100"> </el-table-column>
          <el-table-column prop="name" label="名称" width="280">
          </el-table-column>
          <el-table-column prop="slug" label="slug" width="380">
          </el-table-column>
          <el-table-column prop="width" label="尺寸: 宽" width="250">
          </el-table-column>
          <el-table-column prop="height" label="尺寸: 高" width="250">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-dropdown trigger="click" class="coures">
                <span class="el-dropdown-link">
                  ...
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="clearfix">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)"
                      >编辑</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix">
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
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
import advertise from "../gloabl/request/advertise";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      advertise.index().then(res => {
        this.tableData = res;
      });
    },
    handleEdit(index, row) {
      let id = row.id;
      this.$router.push({ path: "/advertise/edit/" + id, query: { id } });
    },
    handleDelete(index, row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          advertise.delete(id).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getList();
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
    create() {
      this.$router.push({ name: "AdvertiseCreate" });
    }
  }
};
</script>
<style lang="less" scoped>
.advertise-section {
  padding: 10px 20px;
}
.advertise-list {
  padding-top: 20px;
}
.el-dropdown {
  cursor: pointer;
}
</style>
