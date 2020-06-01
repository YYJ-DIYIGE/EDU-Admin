<template>
  <div>
    <componentsMarterial :formdata="material" />
  </div>
</template>
<script>
import componentsMarterial from "../components/Marterial";
import material from "../gloabl/request/material";
export default {
  components: {
    componentsMarterial
  },
  data() {
    return {
      material: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let id = Number(this.$route.query.id);
      material.editshow(id).then(res => {
        this.material = res.Material;
      });
    }
  }
};
</script>
