<template>
  <div class="page-container">
    <div class="course-section">
      <el-button class="course-created" type="primary" plain @click="create"
        >创建物料</el-button
      >
      <div class="course-list">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="id" width="100"> </el-table-column>
          <el-table-column prop="name" label="名称" width="200">
          </el-table-column>
          <el-table-column label="内容" width="500">
            <template slot-scope="scope">
              <div class="imageUrl">
                <img :src="scope.row.image_url" width="100" height="50" />
                <el-link
                  class="image-link"
                  :href="scope.row.image_url"
                  target="_blank"
                  type="primary"
                  >{{ scope.row.image_url }}</el-link
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="跳转链接" width="280" align="center">
            <template slot-scope="scope">
              <el-link
                class="image-link"
                :href="scope.row.link"
                target="_blank"
                type="primary"
                >{{ scope.row.link }}</el-link
              >
            </template>
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
import material from "../gloabl/request/material";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getMaterial();
  },
  methods: {
    getMaterial() {
      material.index().then(res => {
        this.tableData = res;
      });
    },
    handleEdit(row) {
      let id = row.id;
      this.$router.push({ path: "/material/edit/" + id, query: { id } });
    },
    handleDelete(row) {
      let id = row.id;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          material.delete(id).then(res => {
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
                this.getMaterial();
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
      this.$router.push({ name: "MaterialCreate" });
    }
  }
};
</script>
<style lang="less" scoped>
.course-section {
  padding: 10px 20px;
}
.course-list {
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
.imageUrl {
  display: flex;
  .image-link {
    padding-left: 10px;
  }
}
</style>
