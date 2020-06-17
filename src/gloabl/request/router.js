const PREFIX = " http://localhost:7001";
export default {
  qiniuToken: `${PREFIX}/qiniu-uploadtoken`, //七牛
  manageLogin: `${PREFIX}/manageLogin`, //管理员登录
  permissions_slug: id => `${PREFIX}/permissions_slug/${id}`, //权限
  company: `${PREFIX}/company`,
  companyId: id => `${PREFIX}/company/${id}`, //公司
  project: `${PREFIX}/project`,
  projectId: id => `${PREFIX}/project/${id}`, //项目
  versionsId: id => `${PREFIX}/versions/${id}`,
  versions: `${PREFIX}/versions`,
  versionsSort: `${PREFIX}/versions/sort`, //版本
  stories: `${PREFIX}/stories`,
  storiesSort: `${PREFIX}/stories/sort`,
  storiesId: id => `${PREFIX}/stories/${id}`, //故事
  Tasks: `${PREFIX}/tasks`,
  TasksId: id => `${PREFIX}/tasks/${id}`, //任务
  course: `${PREFIX}/course`,
  courseId: id => `${PREFIX}/course/${id}`, //课程
  chapters: `${PREFIX}/chapters`,
  chaptersSort: `${PREFIX}/chapters/sort`,
  chaptersId: id => `${PREFIX}/chapters/${id}`, //章
  sections: `${PREFIX}/sections`,
  sectionsId: id => `${PREFIX}/sections/${id}`, //节
  zhiye: `${PREFIX}/zhiye`,
  zhiyeId: id => `${PREFIX}/zhiye/${id}`, //职业
  zhiyePath: `${PREFIX}/zhiyePath`,
  zhiyePathSort: `${PREFIX}/zhiyePath/sort`,
  zhiyePathId: id => `${PREFIX}/zhiyePath/${id}`, //职业路径
  zhiyeCourses: `${PREFIX}/zhiyeCourses`,
  zhiyeCoursesId: id => `${PREFIX}/zhiyeCourses/${id}`, //职业关联课程
  stacks: `${PREFIX}/stacks`,
  stacksId: id => `${PREFIX}/stacks/${id}`, //技能
  subject: `${PREFIX}/subject`,
  subjectId: id => `${PREFIX}/subject/${id}`, //题目
  permissions: `${PREFIX}/admin/permission`, //权限
  role: `${PREFIX}/admin/role`,
  roleId: id => `${PREFIX}/admin/role/${id}`, //角色
  manage: `${PREFIX}/admin/manage`,
  manageID: id => `${PREFIX}/admin/manage/${id}`, //管理员
  advertise: `${PREFIX}/advertise`,
  advertiseId: id => `${PREFIX}/advertise/${id}`, //广告
  material: `${PREFIX}/material`,
  materialId: id => `${PREFIX}/material/${id}`, //物料
  advertiseMaterial: `${PREFIX}/advertise/material`,
  advertiseMaterialID: id => `${PREFIX}/advertise/material/${id}`,
  advertiseMaterialSort: `${PREFIX}/advertise/material/sort` //广告物料
};
