<template>
  <div>
    <SettingRole :roleform="role" />
  </div>
</template>
<script>
import SettingRole from "../components/SettingRole";
import roles from "../gloabl/request/roles";
export default {
  components: {
    SettingRole
  },
  data() {
    return {
      role: {}
    };
  },
  created() {
    let id = Number(this.$route.query.id);
    roles.editshow(id).then(res => {
      this.role = res.RolesShow;
    });
  }
};
</script>
