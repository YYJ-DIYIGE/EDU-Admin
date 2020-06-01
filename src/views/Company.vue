<template>
  <div class="page-container">
    <div class="enterprise-section">
      <el-button class="enterprise-created" type="primary" plain @click="create"
        >创建企业</el-button
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
import company from "../gloabl/request/company";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getCompany();
  },
  methods: {
    getCompany() {
      company.index().then(res => {
        this.tableData = res;
      });
    },
    handleEdit(index, row) {
      let id = row.id;
      this.$router.push({ path: "/company/edit/" + id, query: { id } });
    },
    handleDelete(index, row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          company.delete(id).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getCompany();
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
      this.$router.push({ name: "CompanyCreate" });
    }
  }
};
</script>
<style lang="less" scoped>
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
