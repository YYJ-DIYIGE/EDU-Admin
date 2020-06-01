<template>
  <div>
    <componentsSubject :formdata="subject" />
  </div>
</template>
<script>
import componentsSubject from "../components/Subject";
import subject from "../gloabl/request/subject";
export default {
  components: {
    componentsSubject
  },
  data() {
    return {
      subject: {}
    };
  },
  created() {
    let id = Number(this.$route.query.id);
    subject.editshow(id).then(res => {
      this.subject = res.Subject;
    });
  }
};
</script>
