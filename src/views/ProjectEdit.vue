<template>
  <div class="page-container">
    <ProjectEdit :formdata="form" />
  </div>
</template>
<script>
import ProjectEdit from "../components/Project";
import project from "../gloabl/request/project";
export default {
  components: {
    ProjectEdit
  },
  data() {
    return {
      form: {}
    };
  },
  created() {
    let id = Number(this.$route.query.id);
    project.editshow(id).then(res => {
      this.form = res.ProjectsEdit;
    });
  }
};
</script>
<style lang="less" scoped></style>
