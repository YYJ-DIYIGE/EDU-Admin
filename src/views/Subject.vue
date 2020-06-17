<template>
  <div class="page-container">
    <div class="subject-section">
      <el-button
        class="subject-created"
        type="primary"
        plain
        @click="createSubject"
        >创建题目</el-button
      >
      <div class="subject-list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="id" width="100"> </el-table-column>
          <el-table-column prop="stem" label="名称" width="850">
          </el-table-column>
          <el-table-column prop="stacks" label="技能" width="250">
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
import subject from "../gloabl/request/subject";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      total: 500,
      row: 10
    };
  },
  created() {
    this.getSubject(this.page, this.row);
  },
  methods: {
    handleCurentChange(rowsValue) {
      const page = rowsValue;
      this.getSubject(page, this.row);
    },
    getSubject(page, row) {
      subject.index({ page, row }).then(res => {
        console.log(res);
        this.tableData = res.SubjectPage;
        this.total = res.total;
      });
    },
    handleEdit(index, row) {
      let id = row.id;
      this.$router.push({ path: "/subject/edit/" + id, query: { id } });
    },
    handleDelete(index, row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          subject.delete(id).then(res => {
            switch (res.code) {
              case 404:
                this.$message.error(res.message);
                break;
              default:
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.getSubject();
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
    createSubject() {
      this.$router.push({ name: "SubjectCreate" });
    }
  }
};
</script>
<style lang="less" scoped>
.el-pagination {
  text-align: right;
}
.subject-section {
  padding: 10px 20px;
}
.subject-list {
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
