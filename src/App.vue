<template>
  <div class="global" style="height: 100vh;">
    <vue3-tree-org :data="data" center :horizontal="horizontal" :collapsable="collapsable" :label-style="style"
      :only-one-node="onlyOneNode" :clone-node-drag="cloneNodeDrag" :before-drag-end="beforeDragEnd"
      @on-contextmenu="onContextmenu" @on-node-dblclick="onNodeDblclick" @on-node-click="onNodeClick" :props="props">

      <!-- 自定义节点内容 -->
      <template v-slot="{ node }">
        <el-tooltip class="box-item" effect="dark" raw-content :content="tipsValue" placement="top">
          <div class="tree-org-node__text node-label" @mouseenter="onOpenTips(node.id)">
            <div>{{ node.label }}</div>
          </div>
        </el-tooltip>
      </template>
    </vue3-tree-org>
  </div>
  <el-button round class="export" size="large" type="primary">
    <svg @click="exportPdf" class="icon" style="margin-left: 20px;" aria-hidden="true">
      <use xlink:href="#icon-Pdf"></use>
    </svg>
    <svg @click="exportPng" class="icon" style="margin-left: 20px;" aria-hidden="true">
      <use xlink:href="#icon-PNG"></use>
    </svg>
    <svg class="icon" style="margin-left: 20px; cursor: default;" aria-hidden="true">
      <use xlink:href="#icon-daochu"></use>
    </svg>
  </el-button>
</template>
<script setup lang="jsx">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { findCurNode } from './assets/utils/node'
import html2pdf from 'html2pdf.js'

const cloneNodeDrag = ref(true)
let props = { label: 'label', value: 'value', expand: 'expand', children: 'children' }

let horizontal = true
let collapsable = true
let onlyOneNode = false
let style = {
  background: '#F7EBD9',
  color: '#5e6d82',
  width: ' 100px',
  boxShadow: 'none',
  border: '1px solid #F2A93B',
  borderRadius: '5px',
  fontSize: '12px'
}


const beforeDragEnd = (node, targetNode) => {
  return new Promise((resolve, reject) => {
    if (!targetNode) reject()
    if (node.id === targetNode.id) {
      reject()
    } else {
      resolve()
    }
  })
}
const onNodeDblclick = () => {
  console.log('onNodeDblclick')
}
const onNodeClick = (e, data) => {
  // ElMessage(data.label);
  // console.log(data);
}
const onContextmenu = ({ command, mode }) => {
  console.log(command, mode)
}



const removeCloneDragFun = () => {
  document.querySelector('#clone-tree-org').remove()
}
const cancelRightMenu = () => {
  // 选择需要观察变动的节点
  const targetNode = document.body;

  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true, childList: true, subtree: true };

  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList, observer) {
    let contextmenu = document.querySelector('.zm-tree-contextmenu')
    if (contextmenu) contextmenu.remove()
  };

  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback);

  // 以上述配置开始观察目标节点
  observer.observe(targetNode, config);

  // document.oncontextmenu = function () {
  //   return false;
  // }
}

const tipsValue = ref("Null")
const onOpenTips = (id) => {
  // console.log(Number(id))
  tipsValue.value = findCurNode([data], Number(id), 'id').conf[0].value
  // console.log(tipsValue.value)
}


// 本地数据存储变量
let data = {
  "id": "1",
  "dataType": "100",
  "label": "董事会",
  "value": "王大拿",
  "conf": [
    {
      "label": "董事会成员",
      "value": "王大拿"
    }
  ],
  "children": [
    {
      "id": "2",
      "dataType": "200",
      "label": "总经理",
      "conf": [
        {
          "label": "姓名",
          "value": "<b>刘大根儿</b>"
        }
      ],
      "children": [
        {
          "id": "3",
          "dataType": "300",
          "label": "分公司1",
          "conf": [
            {
              "label": "姓名",
              "value": "大聪明"
            }
          ],
          "children": [
            {
              "id": "7",
              "dataType": "400",
              "label": "市场部",
              "conf": [
                {
                  "label": "经理",
                  "value": "牛利群"
                }
              ]
            },
            {
              "id": "8",
              "dataType": "400",
              "label": "业务部",
              "conf": [
                {
                  "label": "经理",
                  "value": "郑乾"
                }
              ]
            },
            {
              "id": "31",
              "dataType": "400",
              "label": "客服部",
              "conf": [
                {
                  "label": "经理",
                  "value": "郑乾"
                }
              ],
              "children": [
                {
                  "id": "311",
                  "dataType": "400",
                  "label": "客服1部",
                  "conf": [
                    {
                      "label": "经理",
                      "value": "牛1"
                    }
                  ]
                },
                {
                  "id": "312",
                  "dataType": "400",
                  "label": "客服2部",
                  "conf": [
                    {
                      "label": "经理",
                      "value": "牛1"
                    }
                  ]
                },
                {
                  "id": "313",
                  "dataType": "400",
                  "label": "客服3部",
                  "conf": [
                    {
                      "label": "经理",
                      "value": "牛1"
                    }
                  ]
                },
                {
                  "id": "314",
                  "dataType": "400",
                  "label": "客服4部",
                  "conf": [
                    {
                      "label": "经理",
                      "value": "牛1"
                    }
                  ]
                },
                {
                  "id": "315",
                  "dataType": "400",
                  "label": "客服5部",
                  "conf": [
                    {
                      "label": "经理",
                      "value": "牛1"
                    }
                  ]
                }
              ]
            },
            {
              "id": "32",
              "dataType": "400",
              "label": "售后部",
              "conf": [
                {
                  "label": "经理",
                  "value": "郑乾"
                }
              ]
            },
            {
              "id": "33",
              "dataType": "400",
              "label": "测试部",
              "conf": [
                {
                  "label": "经理",
                  "value": "郑乾"
                }
              ]
            },
            {
              "id": "34",
              "dataType": "400",
              "label": "营销部",
              "conf": [
                {
                  "label": "经理",
                  "value": "郑乾"
                }
              ],
              "children": [
                {
                  "id": "341",
                  "dataType": "400",
                  "label": "营销1部",
                  "conf": [
                    {
                      "label": "经理",
                      "value": "牛1"
                    }
                  ]
                },
                {
                  "id": "342",
                  "dataType": "400",
                  "label": "营销2部",
                  "conf": [
                    {
                      "label": "经理",
                      "value": "牛1"
                    }
                  ]
                },
                {
                  "id": "343",
                  "dataType": "400",
                  "label": "营销3部",
                  "conf": [
                    {
                      "label": "经理",
                      "value": "牛1"
                    }
                  ]
                },
                {
                  "id": "344",
                  "dataType": "400",
                  "label": "营销4部",
                  "conf": [
                    {
                      "label": "经理",
                      "value": "牛1"
                    }
                  ]
                },
                {
                  "id": "345",
                  "dataType": "400",
                  "label": "营销5部",
                  "conf": [
                    {
                      "label": "经理",
                      "value": "牛1"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "4",
          "dataType": "300",
          "label": "副总经理",
          "conf": [
            {
              "label": "姓名",
              "value": "大明白"
            }
          ],
          "children": [
            {
              "id": "9",
              "dataType": "400",
              "label": "设计部",
              "conf": [
                {
                  "label": "经理",
                  "value": "任美丽"
                }
              ]
            },
            {
              "id": "10",
              "dataType": "400",
              "label": "开发部",
              "conf": [
                {
                  "label": "经理",
                  "value": "步佳班"
                }
              ]
            },
            {
              "id": "11",
              "dataType": "400",
              "label": "运维部",
              "conf": [
                {
                  "label": "经理",
                  "value": "杨功头"
                }
              ]
            }
          ]
        },
        {
          "id": "5",
          "dataType": "300",
          "label": "副总经理",
          "conf": [
            {
              "label": "姓名",
              "value": "大能耐"
            }
          ],
          "children": [
            {
              "id": "13",
              "dataType": "400",
              "label": "客服部",
              "conf": [
                {
                  "label": "经理",
                  "value": "高大紧"
                }
              ]
            },
            {
              "id": "14",
              "dataType": "400",
              "label": "行政部",
              "conf": [
                {
                  "label": "经理",
                  "value": "蒋公章"
                }
              ]
            },
            {
              "id": "15",
              "dataType": "400",
              "label": "人力资源部",
              "conf": [
                {
                  "label": "经理",
                  "value": "钊仁才"
                }
              ]
            },
            {
              "id": "12",
              "dataType": "400",
              "label": "财务部",
              "conf": [
                {
                  "label": "经理",
                  "value": "程有财"
                }
              ]
            }
          ]
        },
        {
          "id": "6",
          "dataType": "300",
          "label": "分公司",
          "conf": [
            {
              "label": "分公司总经理",
              "value": "赵老四"
            }
          ],
          "children": []
        }
      ]
    }
  ]
}

const tree = [
  {
    id: 1,
    pid: null,
    children: [
      {
        id: 3,
        pid: 1,
        children: [
          { id: 4, pid: 3 },
          { id: 6, pid: 3 },
        ]
      },
      { id: 5, pid: 1 },
    ]
  },
  {
    id: 2,
    pid: null,
    children: [
      {
        id: 7,
        pid: 2,
        children: [
          { id: 10, pid: 7 },
          { id: 11, pid: 7 },
        ]
      },
      { id: 9, pid: 2 },
    ]
  },
]

const successMessage = () => {
  ElMessage({
    message: 'Export successfully.',
    type: 'success',
  })
}
const exportPng = () => {
  console.log('export png')
}
const exportPdf = () => {

  const container = document.querySelector('.zoom-container');
  container.style.overflow = "unset";
  html2pdf(container);


  function callback() {
    // console.log('导出成功！');
    container.style.overflow = "hidden";
    container.style.opacity = "1";
    successMessage();
  }
}

// 网络请求
const requestNetworkData = () => {
  return axios.get('/api/tree/data').then((res) => {
    // data 如果是 Object 而非 Array, 那么在查找节点时应当在外面套一层数组结构
    res.status === '200' && console.log(res.data)
  })
}

// DOM元素初始化后
onMounted(() => {
  removeCloneDragFun()
  cancelRightMenu()
  // console.log(findCurNode([data], 1, 'id'))
})
</script>

<!-- 修改节点样式 -->
<style>
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon {
  width: 28px;
  cursor: pointer;
}

.global {
  padding: 15px;
}

.zm-tree-org {
  padding: 0 !important;
  height: 100%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.tree-org-node__content .tree-org-node__text {
  padding: 3px;
  /* font-weight: bold; */
}

.horizontal .tree-org-node.is-leaf,
.horizontal .tree-org-node.collapsed {
  padding-top: 0;
  padding-bottom: 0;
}

.export {
  position: fixed;
  right: -10px;
  top: 20px;
  cursor: default;
  padding-right: 5px !important;
  background: white;
  display: flex;
  justify-content: right;
  width: 40px;
  overflow: hidden;
  transition: all .3s ease-in-out;
}

.export:hover {
  width: 150px;
  right: 0;
}
</style>