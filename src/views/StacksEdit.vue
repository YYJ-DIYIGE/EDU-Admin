<template>
  <div class="page-container">
    <ComponentsStacks :formdata="form" />
  </div>
</template>
<script>
import ComponentsStacks from "../components/ComponentsStacks";
import stacks from "../gloabl/request/stacks";
export default {
  components: {
    ComponentsStacks
  },
  data() {
    return {
      form: {}
    };
  },
  created() {
    let id = Number(this.$route.query.id);
    stacks.editshow(id).then(res => {
      this.form = res.StacksEdit;
      console.log(res.StacksEdit);
    });
  }
};
</script>
<style lang="less" scoped></style>
