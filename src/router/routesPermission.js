import Course from "../views/Course.vue";
import CourseCreate from "../views/CourseCreate.vue";
import CourseEdit from "../views/CourseEdit.vue";
import BasicLayout from "@/components/BasicLayout.vue";
import Company from "../views/Company.vue";
import CompanyCreate from "../views/CompanyCreate.vue";
import CompanyEdit from "../views/CompanyEdit.vue";
import Project from "../views/Project.vue";
import ProjectCreate from "../views/ProjectCreate.vue";
import ProjectEdit from "../views/ProjectEdit.vue";
import ProjectDesc from "../views/ProjectDesc.vue";
import Zhiye from "../views/Zhiye.vue";
import ZhiyeCreate from "../views/ZhiyeCreate.vue";
import ZhiyeEdit from "../views/ZhiyeEdit";
import Stacks from "../views/Stacks";
import StacksCreate from "../views/StacksCreate";
import StacksEdit from "../views/StacksEdit";
import Subject from "../views/Subject";
import SubjectCreate from "../views/SubjectCreate";
import SubjectEdit from "../views/SubjectEdit";
import SettingRole from "../views/SettingRole";
import SettingRoleCreate from "../views/SettingRoleCreate";
import SettingRoleEdit from "../views/SettingRoleEdit";
import SettingManager from "../views/SettingManager";
import SettingManagerCreate from "../views/SettingManagerCreate";
import SettingManagerEdit from "../views/SettingManagerEdit";
import Welcome from "../views/Welcome";
import Material from "../views/Material";
import MaterialCreate from "../views/MaterialCreate";
import MaterialEdit from "../views/MaterialEdit";
import Advertise from "../views/Advertise";
import AdvertiseCreate from "../views/AdvertiseCreate";
import AdvertiseEdit from "../views/AdvertiseEdit";
export default [
  {
    path: "/",
    name: "Root",
    component: BasicLayout,
    redirect: { name: "Welcome" },
    children: [
      {
        path: "/welcome",
        name: "Welcome",
        component: Welcome,
        meta: {
          nav: {
            icon: "el-icon-pie-chart",
            title: "welcome"
          },
          breadcrumb: {
            title: "welcome"
          }
        }
      },
      {
        path: "/zhiyekc",
        name: "ZhiyekcRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-tickets",
            title: "职业课程"
          }
        },
        children: [
          {
            path: "/course",
            name: "CourseRoot",
            permission: "course",
            component: { render: h => h("router-view") },
            redirect: { name: "Course" },
            meta: {
              nav: {
                title: "课程管理"
              },
              breadcrumb: {
                title: "课程"
              }
            },
            children: [
              {
                path: "/course",
                name: "Course",
                component: Course
              },
              {
                path: "/course/create",
                name: "CourseCreate",
                component: CourseCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/course/edit/:id",
                name: "CourseEdit",
                component: CourseEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          },
          {
            path: "/zhiye",
            name: "ZhiyeRoot",
            permission: "path",
            component: { render: h => h("router-view") },
            redirect: { name: "Zhiye" },
            meta: {
              nav: {
                title: "职业路径"
              },
              breadcrumb: {
                title: "职业"
              }
            },
            children: [
              {
                path: "/zhiye",
                name: "Zhiye",
                component: Zhiye
              },
              {
                path: "/zhiye/create",
                name: "ZhiyeCreate",
                component: ZhiyeCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/zhiye/edit/:id",
                name: "ZhiyeEdit",
                component: ZhiyeEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: "/qiyexm",
        name: "qiyexmRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-tickets",
            title: "企业项目"
          }
        },
        children: [
          {
            path: "/company",
            name: "companyRoot",
            permission: "company",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                title: "企业管理"
              },
              breadcrumb: {
                title: "企业"
              }
            },
            children: [
              {
                path: "/company",
                name: "companyList",
                component: Company
              },
              {
                path: "/company/create",
                name: "CompanyCreate",
                component: CompanyCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/company/edit/:id",
                name: "CompanyEdit",
                component: CompanyEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          },
          {
            path: "/project",
            name: "ProjectRoot",
            permission: "project",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                title: "项目管理"
              },
              breadcrumb: {
                title: "项目"
              }
            },
            children: [
              {
                path: "/project",
                name: "Project",
                component: Project
              },
              {
                path: "/project/create",
                name: "ProjectCreate",
                component: ProjectCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/project/edit/:id",
                name: "ProjectEdit",
                component: ProjectEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              },
              {
                path: "/project/desc/:id",
                name: "ProjectDesc",
                component: ProjectDesc,
                meta: {
                  breadcrumb: {
                    title: "详情"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: "/jinengpc",
        name: "jinengpcRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-tickets",
            title: "技能评测"
          }
        },
        children: [
          {
            path: "/stacks",
            name: "StacksRoot",
            permission: "stack",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                title: "技能管理"
              },
              breadcrumb: {
                title: "技能"
              }
            },
            children: [
              {
                path: "/stacks",
                name: "Stacks",
                component: Stacks
              },
              {
                path: "/stacks/create",
                name: "StacksCreate",
                component: StacksCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/stacks/edit/:id",
                name: "StacksEdit",
                component: StacksEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          },
          {
            path: "/subject",
            name: "SubjectRoot",
            permission: "subject",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                title: "题目管理"
              },
              breadcrumb: {
                title: "题目"
              }
            },
            children: [
              {
                path: "/subject",
                name: "Subject",
                component: Subject
              },
              {
                path: "/subject/create",
                name: "SubjectCreate",
                component: SubjectCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/subject/edit/:id",
                name: "SubjectEdit",
                component: SubjectEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: "/guanggaowl",
        name: "GuangGaoWuliaoRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-tickets",
            title: "广告物料"
          }
        },
        children: [
          {
            path: "/advertise",
            name: "AdvertiseRoot",
            permission: "advertise",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                title: "广告管理"
              },
              breadcrumb: {
                title: "广告"
              }
            },
            children: [
              {
                path: "/advertise",
                name: "Advertise",
                component: Advertise
              },
              {
                path: "/advertise/create",
                name: "AdvertiseCreate",
                component: AdvertiseCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/advertise/edit/:id",
                name: "AdvertiseEdit",
                component: AdvertiseEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          },
          {
            path: "/material",
            name: "MaterialRoot",
            permission: "material",
            component: { render: h => h("router-view") },
            meta: {
              nav: {
                title: "物料管理"
              },
              breadcrumb: {
                title: "物料"
              }
            },
            children: [
              {
                path: "/material",
                name: "Material",
                component: Material
              },
              {
                path: "/material/create",
                name: "MaterialCreate",
                component: MaterialCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/material/edit/:id",
                name: "MaterialEdit",
                component: MaterialEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          }
          // {
          //   path: "/subject",
          //   name: "SubjectRoot",
          //   permission: "subject",
          //   component: { render: h => h("router-view") },
          //   meta: {
          //     nav: {
          //       title: "题目管理"
          //     },
          //     breadcrumb: {
          //       title: "题目"
          //     }
          //   },
          //   children: [
          //     {
          //       path: "/subject",
          //       name: "Subject",
          //       component: Subject
          //     },
          //     {
          //       path: "/subject/create",
          //       name: "SubjectCreate",
          //       component: SubjectCreate,
          //       meta: {
          //         breadcrumb: {
          //           title: "创建"
          //         }
          //       }
          //     },
          //     {
          //       path: "/subject/edit/:id",
          //       name: "SubjectEdit",
          //       component: SubjectEdit,
          //       meta: {
          //         breadcrumb: {
          //           title: "编辑"
          //         }
          //       }
          //     }
          //   ]
          // }
        ]
      },
      {
        path: "/setting",
        name: "settingRoot",
        permission: "manage",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-setting",
            title: "管理员设置"
          },
          breadcrumb: {
            title: "设置"
          }
        },
        children: [
          {
            path: "/setting/manager",
            name: "SettingManagerRoot",
            component: { render: h => h("router-view") },
            redirect: { name: "SettingManager" },
            meta: {
              nav: {
                icon: "el-icon-user-solid",
                title: "管理员设置"
              },
              breadcrumb: {
                title: "管理员"
              }
            },
            children: [
              {
                path: "/setting/manager",
                name: "SettingManager",
                component: SettingManager
              },
              {
                path: "/setting/manager/create",
                name: "SettingManagerCreate",
                component: SettingManagerCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/setting/manager/edit/:id",
                name: "SettingManagerEdit",
                component: SettingManagerEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          },
          {
            path: "/setting/role",
            name: "SettingRoleRoot",
            component: { render: h => h("router-view") },
            redirect: { name: "SettingRole" },
            meta: {
              nav: {
                icon: "el-icon-user",
                title: "角色设置"
              },
              breadcrumb: {
                title: "角色"
              }
            },
            children: [
              {
                path: "/setting/role",
                name: "SettingRole",
                component: SettingRole
              },
              {
                path: "/setting/role/create",
                name: "SettingRoleCreate",
                component: SettingRoleCreate,
                meta: {
                  breadcrumb: {
                    title: "创建"
                  }
                }
              },
              {
                path: "/setting/role/edit/:id",
                name: "SettingRoleEdit",
                component: SettingRoleEdit,
                meta: {
                  breadcrumb: {
                    title: "编辑"
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
