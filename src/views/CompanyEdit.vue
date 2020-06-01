<template>
  <div class="page-container">
    <CompanyEdit :formdata="form" />
  </div>
</template>
<script>
import CompanyEdit from "../components/Company";
import company from "../gloabl/request/company";
export default {
  components: {
    CompanyEdit
  },
  data() {
    return {
      form: {},
      ids: Number
    };
  },
  created() {
    let id = Number(this.$route.query.id);
    company.editshow(id).then(res => {
      this.form = res.CompanyEdit;
    });
  }
};
</script>
<style lang="less" scoped></style>
