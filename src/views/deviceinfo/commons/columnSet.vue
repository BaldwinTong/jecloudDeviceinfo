<template>
  <a-modal title="自定义数据列" :visible="isAction" :width="1050" @cancel="$emit('handClose')" @ok="handleSumbit">
    <div class="columnsSetting">
      <p>注：勾选需要显示的列，拖动列前图标进行排序，最小宽度设置不低于48px</p>

      <!-- 配置项表格 -->
      <table width="100%" border="1">
        <colgroup>
          <col />
          <col />
          <col />
          <col style="width: 430px" />
          <col style="width: 180px" />
          <col style="width: 200px" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th>序号</th>
            <th>显示</th>
            <th>冻结</th>
            <th>字段名称</th>
            <th>宽度设置</th>
            <th>对齐</th>
            <th>排序</th>
          </tr>
        </thead>
        <draggable :list="columnsSetting" item-key="dataIndex" @update:modelValue="onItemsUpdated" :draggable="'.item'"
          class="group-tbody" :animation="300" v-bind="dragOptions" tag="tbody">
          <template #item="{ element, index }">
            <tr :class="{ item: shouldBeDraggable(element) }">
              <td class="move" v-for="(header, i) in headers" :key="header">
                <template v-if="header.dataIndex == 'index'">
                  {{ element.index + 1 }}
                </template>

                <template v-if="header.dataIndex == 'isDisplay'">
                  <a-checkbox :checked="element.isDisplay == 1" :disabled="element.disabled === 1"
                    @change="(e) => handleChecked(e, index, 'isDisplay')"></a-checkbox>
                </template>
                <template v-if="header.dataIndex == 'isFreeze'">
                  <a-checkbox :checked="element.isFreeze == 1"
                    :disabled="element.disabled === 1 || getFreezeDisabled(element, index)"
                    @change="(e) => handleChecked(e, index, 'isFreeze')"></a-checkbox>
                </template>
                <template v-if="header.dataIndex == 'title'">
                  {{ element.title }}
                </template>
                <template v-if="header.dataIndex == 'width'">
                  <div class="w-setting">
                    宽度
                    <a-input style="height: 28px;" :value="element.width" :maxLength="4" :disabled="element.status === 1"
                      @blur="(e) => handleInputBlur(e, index)" @change="(e) => handleInputChange(e, index)"></a-input>
                    px
                  </div>
                </template>
                <template v-if="header.dataIndex == 'align'">
                  <a-radio-group name="radioGroup" :value="element.align" @change="changeAlign($event, index)"
                    v-if="!['序号', '操作'].includes(element.name || element.title)">
                    <a-radio value="left">左</a-radio>
                    <a-radio value="center">居中</a-radio>
                    <a-radio value="right">右</a-radio>
                  </a-radio-group>
                </template>
                <template v-if="header.dataIndex == 'sort'">
                  <span class="canDragon iconfont" v-if="element.disabled !== 1" :class="{
                    isActive: dragIndex === index,
                    isHover: dragIndex > 0 && dragIndex !== index
                  }">
                    <MenuOutlined />
                  </span>
                </template>
              </td>
            </tr>
          </template>
        </draggable>
      </table>
    </div>
    <template #footer>
      <div class="ant-modal-footer-style">
        <div>
          <a-checkbox :checked="columnsSetting.every(k => k.isDisplay === 1)" @change="handleChangeCheckAll"> 全选
          </a-checkbox>
        </div>
        <div>
          <a-button key="back" @click="$emit('handClose')"> 取消 </a-button>
          <a-button key="reset" type="primary" ghost @click="handleReset"> 恢复默认 </a-button>
          <a-button key="submit" type="primary" @click="handleSumbit"> 确定 </a-button>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script>
function deepClone(obj) {
  const targetObj = obj.constructor === Array ? [] : {}       //判断是数组还是对象
  for (let keys in obj) {                                     //遍历
    if (obj.hasOwnProperty(keys)) {                         //判断是否有这个属性，容错处理
      if (obj[keys] && typeof obj[keys] === 'object') {   //如果是否为对象，如果是，进入回调
        targetObj[keys] = obj[keys].constructor === Array ? [] : {}     //判断是数组还是对象
        targetObj[keys] = deepClone(obj[keys])          //回调
      } else {
        targetObj[keys] = obj[keys]                     //直接拷贝
      }
    }
  }
  return targetObj
}
import Draggable from 'vuedraggable'
import { Modal, Radio, Input, Checkbox, Button } from "ant-design-vue";
import { MenuOutlined } from '@ant-design/icons-vue';
export default {
  props: {
    isAction: {              // 弹窗开关
      type: Boolean,
      default: false,
    },
    columns: {            // 实际使用的配置项
      type: Array,
      default: () => [],
    },
    defColumns: {     // 配置项默认初始值
      type: Array,
      default: () => [],
    },
    initColumns: {     // 认初始值
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dragIndex: -1,      // 拖拽目标下标
      columnsSetting: [], // 实际显示的表格配置项
      dragOptions: {      // 拖拽参数
        animation: 300,
        handle: '.canDragon'
      },
      headers: [
        {
          title: '序号',
          dataIndex: 'index',
        },
        {
          title: '显示',
          dataIndex: 'isDisplay',
        },
        {
          title: '冻结',
          dataIndex: 'isFreeze',
        },
        {
          title: '字段名称',
          dataIndex: 'title',
        },
        {
          title: '宽度设置',
          dataIndex: 'width',
        },
        {
          title: '对齐',
          dataIndex: 'align',
        },
        {
          title: '排序',
          dataIndex: 'sort',
        },
      ]

    }
  },
  created() {
    this.getColumns()
  },
  components: {
    Draggable,
    AModal: Modal,
    ARadio: Radio,
    ARadioGroup: Radio.Group,
    AInput: Input,
    ACheckbox: Checkbox,
    AButton: Button,
    MenuOutlined,
  },

  methods: {
    // 渲染表格配置项
    getColumns() {
      // 初始化配置项
      this.columnsSetting = deepClone(this.defColumns)
      this.columnsSetting = this.columnsSetting.filter(k => k.dataIndex !== 'checkbox').map((k, i) => {
        // 处理序号 和 操作项
        k.index = i
        if (
          (k.dataIndex === 'index' || k.title === '序号')
          ||
          (k.dataIndex === 'action' || k.title === '操作')
        ) {
          k.disabled = k.isDisplay = 1
          k.status = 1
        } else {
          // 如果是固定
          if (k.fixed) {
            k.disabled = k.isDisplay = 1
          } else {
            k.disabled = 0
          }
        }
        return k
      })

      this.updateFreeze()

    },

    onItemsUpdated(newItems) {
      this.columnsSetting = newItems; // 更新项目
    },
    // 监听输入宽度
    handleInputChange(e, index) {
      this.$nextTick(() => {
        e.target.value = e.target.value.replace(/[^\d]/g, '')
        // 宽度不能大于500
        if (Number(e.target.value) > 500) {
          e.target.value = 500
        }
        this.columnsSetting[index].width = e.target.value * 1
      })
    },
    // 监听失焦
    handleInputBlur(e, index) {
      this.$nextTick(() => {
        e.target.value = Number(e.target.value.replace(/[^\d]/g, ''))
        // 如果输入为0则清空
        if (e.target.value === '0') {
          e.target.value = ''
          // 宽度不能大于500
        } else if (Number(e.target.value) > 500) {
          e.target.value = 500
          // 宽度不能低于48px
        } else if (Number(e.target.value) < 48) {
          e.target.value = 48
        }

        this.columnsSetting[index].width = e.target.value
      })
    },
    changeAlign(e, i) {
      this.columnsSetting[i].align = e.target.value
      this.$forceUpdate()
    },
    // 单项选择
    handleChecked(e, item, type) {
      this.columnsSetting[item][type] = e.target.checked ? 1 : 0
      this.$forceUpdate()
      this.updateFreeze()
    },
    // 更新冻结
    updateFreeze() {
      // 冻结，也就是浮动最后元素下标
      let freezeIndex = deepClone(this.columnsSetting).map(k => k.isFreeze).lastIndexOf(1)
      this.columnsSetting = this.columnsSetting.map((k, i) => {
        // 冻结浮动，动态菜单
        if (i <= freezeIndex) {
          k.isFreeze = 1
        }
        return k
      })
    },
    // 是否禁用冻结
    getFreezeDisabled(e, index) {
      // 冻结，也就是浮动最后元素下标
      let freezeIndex = deepClone(this.columnsSetting).map(k => k.isFreeze).lastIndexOf(1)
      return freezeIndex !== -1 && freezeIndex > index
    },
    // 点击全选 / 取消选择
    handleChangeCheckAll(e) {
      this.columnsSetting = this.columnsSetting.map(k => {
        // 如果不是禁用情况下
        if (k.disabled !== 1) {
          k.isDisplay = e.target.checked ? 1 : 0
        }
        return k
      })
    },
    // 开始拖拽排序
    handleDragStart(e) {
      this.dragIndex = e.oldIndex
    },
    // 结束拖拽排序
    handleDragEnd(e) {
      this.dragIndex = -1
      this.updateFreeze()
    },
    shouldBeDraggable(element) {
      return element.disabled != 1
    },
    // 恢复默认
    handleReset() {
      //columns
      let list = deepClone(this.initColumns)

      let arr = this.columnsSetting;
      arr = arr.map(k => {
        if (!(k.title === '操作' || k.dataIndex === 'action')) {
          let find = list.find(v => v.dataIndex === k.dataIndex)
          if (find) {
            // 恢复默认勾选
            k.isDisplay = find.isDisplay || 1
            // 恢复默认宽度
            k.width = find.width
            // 恢复默认排序
            k.sort = find.sort
          } else {
            k.isDisplay = 0
          }
        }
        return k
      })
      // 恢复默认排序
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          //如果第一个比第二个大，就交换他们两个位置
          if (arr[i].sort > arr[j].sort) {
            var temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
          }
        }
      }
      this.columnsSetting = arr
    },
    // 提交修改
    handleSumbit() {
      let columnsSetting = deepClone(this.columnsSetting).filter((k, i) => !!k.isDisplay);
      this.$emit('handleColumnSetting',columnsSetting)
    },
    // 监听回车
    keyDown(e) {
      if (e.keyCode === 13) {
        this.handleSumbit()
      }
    },

  },
  watch: {
    value() {
      if (this.value) {
        this.getColumns()
        // 添加回车提交
        window.addEventListener("keydown", this.keyDown, true);
      } else {
        // 添加回车提交
        window.removeEventListener("keydown", this.keyDown, true);
      }
    }
  }
}
</script>
<style lang="less" scoped>
.columnsSetting {
  height: 60vh;
  overflow: auto;

  >p {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    margin-bottom: 20px;
  }
}

.ant-modal-footer-style {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

table {
  border-color: #e8e8e8;
  font-size: 14px;
  border-bottom: none;

  tr {
    height: 38px;
  }

  tr th,
  tr td {
    padding: 0 8px;
  }

  tr td {
    text-align: center;

    >div {
      text-align: left;
    }

    >.iconfont {
      font-size: 16px;
      cursor: pointer;

      &:not(.isHover):hover {
        color: @primary-color;
      }

      &.isActive {
        color: @primary-color;
      }
    }

    >.w-setting {
      display: flex;
      align-items: center;

      >input {
        width: 88px;
        margin: 0 6px;
      }
    }
  }

  /deep/ span.ant-radio+* {
    padding: 0 5px;
    margin-right: 4px;
  }

  thead {
    background: #FAFAFA;
  }

  .group-tbody-item {
    width: 100%;
    background: #fff;

    &.group-tbody-item-drag {
      background: #EAF3FA;
    }

    &.sortable-drag {
      td {
        width: 45px;
      }

      td:nth-child(3) {
        width: 478px;
      }

      td:nth-child(4) {
        width: 180px;
      }

    }
  }
}
</style>