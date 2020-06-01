<template>
  <div class="page-container">
    <div class="page-header">
      <div class="header-title">
        <h3>Project</h3>
        <p>project description</p>
      </div>
    </div>
    <div class="page-body">
      <div class="versions-section">
        <div class="versions-container">
          <h2 class="versions-title">版本</h2>
          <div class="versions-content">
            <Draggable
              :project_id="project_id"
              :listdata="listData"
              @childFn="parentFn"
            />
          </div>
        </div>
      </div>
      <div class="versions-section">
        <div class="versions-container">
          <h2 class="versions-title">故事</h2>
          <div class="versions-content">
            <ComponentsStories
              :versions_id="versions_id"
              :project_id="project_id"
              :Storiesdata="Storiesdata"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Draggable from "../components/VersionsDraggable.vue";
import versions from "../gloabl/request/versions.js";
import Stories from "../gloabl/request/stories.js";
import ComponentsStories from "../components/Stories.vue";
export default {
  components: {
    Draggable,
    ComponentsStories
  },
  data() {
    return {
      project_id: null,
      listData: [],
      Storiesdata: [],
      versions_id: null
    };
  },
  created() {
    this.getVersions();
  },
  methods: {
    parentFn(id) {
      this.versions_id = Number(id);
      this.getStories(id);
    },
    getVersions() {
      let id = Number(this.$route.query.id);
      this.project_id = id;
      versions.index(id).then(res => {
        this.listData = res;
        this.versions_id = res[0].id;
        this.getStories(res[0].id);
      });
    },
    getStories(versions_id) {
      Stories.index({ versions_id }).then(res => {
        this.Storiesdata = res.Storie;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.page-container {
  width: 100%;
  height: 100%;
  .page-header {
    height: 100px;
    padding: 20px 40px;
    margin: 0 10px;
    border-bottom: 1px solid;
  }
}
.page-body {
  display: flex;
}
.versions-section {
  width: 50%;
  padding: 20px 50px;
}
.versions-container {
  margin: 0 87px;
}
</style>
