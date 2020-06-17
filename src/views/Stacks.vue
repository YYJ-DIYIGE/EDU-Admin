<template>
  <div class="page-container">
    <div class="enterprise-section">
      <el-button class="enterprise-created" type="primary" plain @click="create"
        >创建技能</el-button
      >
      <div class="enterprise-list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="id" width="100"> </el-table-column>
          <el-table-column prop="name" label="名称" width="280">
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
        <el-pagination
          @current-change="handleCurentChange"
          :current-page="page"
          :page-size="row"
          class="el-pagination"
          background
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import stacks from "../gloabl/request/stacks";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      total: 500,
      row: 14
    };
  },
  created() {
    this.getStacks(this.page, this.row);
  },
  methods: {
    handleCurentChange(rowsValue) {
      const page = rowsValue;
      this.getStacks(page, this.row);
    },
    getStacks(page, row) {
      stacks.index({ page, row }).then(res => {
        this.tableData = res.stacks;
        this.total = res.total;
      });
    },
    handleEdit(row) {
      let id = row.id;
      this.$router.push({ path: "/stacks/edit/" + id, query: { id } });
    },
    handleDelete(row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          stacks.delete(id).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getStacks();
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
      this.$router.push({ name: "StacksCreate" });
    }
  }
};
</script>
<style lang="less" scoped>
.el-pagination {
  text-align: right;
}
.enterprise-section {
  padding: 10px 20px;
}
.enterprise-list {
  padding-top: 20px;
}
.el-dropdown {
  cursor: pointer;
}
</style>
