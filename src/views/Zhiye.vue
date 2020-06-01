<template>
  <div class="page-container">
    <div class="zhiye-section">
      <el-button class="zhiye-created" type="primary" plain @click="createzhiye"
        >创建职业</el-button
      >
      <div class="zhiye-list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="id" width="100"> </el-table-column>
          <el-table-column prop="name" label="名称" width="350">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="280"
            align="center"
          >
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
import zhiye from "../gloabl/request/zhiye";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getZhiye();
  },
  methods: {
    getZhiye() {
      zhiye.index().then(res => {
        res.map(data => {
          data.status = data.status ? "已完成" : "未完成";
          this.tableData.push(data);
        });
      });
    },
    handleEdit(index, row) {
      let id = row.id;
      this.$router.push({ path: "/zhiye/edit/" + id, query: { id } });
    },
    handleDelete(index, row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          zhiye.delete(id).then(res => {
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
                this.getZhiye();
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
    createzhiye() {
      this.$router.push({ name: "ZhiyeCreate" });
    }
  }
};
</script>
<style lang="less" scoped>
.zhiye-section {
  padding: 10px 20px;
}
.zhiye-list {
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
