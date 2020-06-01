<template>
  <div>
    <SettingManage :formdata="manager" />
  </div>
</template>
<script>
import SettingManage from "../components/SettingManage";
import manage from "../gloabl/request/manage";
export default {
  components: {
    SettingManage
  },
  data() {
    return {
      manager: {}
    };
  },
  created() {
    let id = Number(this.$route.query.id);
    manage.editshow(id).then(res => {
      this.manager = res.Manage;
    });
  }
};
</script>
