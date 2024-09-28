<template>
  <div class="pages">
    <div class="table-page-search-wrapper">
      <a-form style="width: 100%">
        <a-row :gutter="24">
          <a-col :md="6" :sm="8">
            <a-form-item label="设备名称">
              <a-input v-model="queryParam.name" style="width: 100%" placeholder="请输入设备名称" />
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <a-form-item label="状态">
              <a-select v-model="queryParam.status" placeholder="请选择状态" allow-clear>
                <a-select-option :value="1">在线</a-select-option>
                <a-select-option :value="2">离线</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery">查询</a-button>
              <a-button class="margin-left-s" @click="resetQuery">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="table_box">
      <a-table :columns="columns" :dataSource="tableData" size="small" :loading="loading" :pagination="ipagination"
        bordered @change="onChange">
        <template #headerCell="{ title, column }">
          <template v-if="column.key === 'action'">
            <div class="actionSet">
              <span>操作</span>
              <SettingOutlined style="cursor: pointer;" @click="handleSetColumns" />
            </div>
          </template>
        </template>
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'index'">
            <span>{{ index + 1 }}</span>
          </template>
          <template v-else-if="column.key === 'status'">
            <span :class="record.status != 0 ? 'activeStatus' : ''">{{ record.status == 0 ? '离线' : '在线' }}</span>
          </template>
          <template v-else-if="column.key === 'mode_code'">
            <span> {{ ModeCode[record.mode_code] || '--' }}</span>
          </template>
          <template v-else-if="column.key === 'taskName'">
            <a v-if="record.taskName"> {{ record.taskName }}</a>
            <span v-else>--</span>
          </template>
          <template v-else-if="column.key == 'cameraA' || column.key == 'cameraB'">
            <a v-if="record.cameras" @click="handleShow(record.cameras,'摄像头')">查看</a>
            <span v-else>--</span>
          </template>
          <template v-else-if="column.key === 'position_state'">
            <a v-if="record.position_state" @click="handleShow(record.position_state,'搜星状态')">查看</a>
            <span v-else>--</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <a @click="handleModal(record)">查看</a>
            <a-divider type="vertical" />
            <a @click="handleVideoModal(record)">实时视频</a>
            <a-divider type="vertical" />
            <a @click="handleMapModal(record)">实时地图</a>
          </template>
          <template v-else>
            {{ record[column.dataIndex] || '--' }}
          </template>
        </template>

      </a-table>
    </div>
    <DetailModal v-if="detail.show" :visible="detail.show" :model="detail.model" @handClose="handClose"></DetailModal>
    <VideoPlay v-if="videoModal.show" :visible="videoModal.show" :model="videoModal.model" @handClose="handClose">
    </VideoPlay>
    <ColumnSet :columns="columns" :initColumns="initColumns" :isAction="isAction" :defColumns="defColumns" v-if="isAction"
      @handClose="handClose" @handleColumnSetting="handleColumnSetting">
    </ColumnSet>
    <ModalInfo v-if="modalInfo.show" :visible="modalInfo.show" :model="modalInfo.model" @handClose="handClose"></ModalInfo>
  </div>
</template>

<script>
import 'ant-design-vue/dist/antd.less';
import { Button, Input, Form, Row, Col, Select, Table, Divider } from 'ant-design-vue';
import DetailModal from './DetailModal.vue';
import VideoPlay from './VideoPlay.vue';
import { getDeviceInfo } from '@/api/index';
import { SettingOutlined } from '@ant-design/icons-vue';
import ColumnSet from "./commons/columnSet.vue";
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import ModalInfo from "./modalInfo.vue";
let ModeCode = {
  0: '待机',
  1: '起飞准备',
  2: '起飞准备完毕',
  3: '手动飞行',
  4: '自动起飞',
  5: '航线飞行',
  6: '全景拍照',
  7: '智能跟随',
  8: 'ADS-B 躲避',
  9: '自动返航',
  10: '自动降落',
  11: '强制降落',
  12: '三桨叶降落',
  13: '升级中',
  14: '未连接',
  15: 'APAS',
  16: '虚拟摇杆状态',
  17: '指令飞行',
  18: '空中 RTK 收敛模式',
}
export default {
  components: {
    AButton: Button,
    AInput: Input,
    AForm: Form,
    AFormItem: Form.Item,
    ARow: Row,
    ACol: Col,
    ASelect: Select,
    ASelectOption: Select.Option,
    ATable: Table,
    ADivider: Divider,
    DetailModal,
    VideoPlay,
    SettingOutlined,
    ColumnSet,
    ModalInfo,
  },
  data() {
    return {
      loading: false,
      isAction: false,
      queryParam: {},
      ModeCode,
      ipagination: {
        current: 1,
        pageSize: 10,
        pageSizeOptions: ['10', '20', '30', '40'],
        showTotal: (total, range) => {
          return range[0] + '-' + range[1] + ' 总共' + total + '条记录';
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,
      },
      columns: [],
      initColumns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          isDisplay: 1,
          sort: 1,
          align: 'left',
          width: 80,
        },
        {
          title: '飞行器',
          dataIndex: 'deviceName',
          isDisplay: 1,
          sort: 2,
          align: 'left',
          key: 'deviceName',
        },
        {
          title: '状态',
          dataIndex: 'status',
          isDisplay: 1,
          sort: 3,
          align: 'left',
          key: 'status',
        },
        {
          title: '飞行器状态',
          dataIndex: 'mode_code',
          isDisplay: 1,
          sort: 4,
          align: 'left',
          key: 'mode_code',
        },
        {
          title: '执行任务',
          dataIndex: 'taskName',
          isDisplay: 1,
          sort: 5,
          align: 'left',
          key: 'taskName',
        },
        {
          title: '电池1剩余电量(%)',
          dataIndex: 'battery0',
          isDisplay: 1,
          sort: 6,
          align: 'left',
          key: 'battery0',
        },
        {
          title: '电池2剩余电量(%)',
          dataIndex: 'battery1',
          isDisplay: 1,
          sort: 7,
          align: 'left',
          key: 'battery1',
        },
        {
          title: '摄像头1',
          dataIndex: 'cameraA',
          isDisplay: 1,
          sort: 8,
          align: 'left',
          key: 'cameraA',
        },
        {
          title: '摄像头2',
          dataIndex: 'cameraB',
          isDisplay: 1,
          sort: 9,
          align: 'left',
          key: 'cameraB',
        },

        {
          title: '操作',
          dataIndex: 'action',
          isDisplay: 1,
          sort: 10,
          align: 'left',
          key: 'action',
          fixed: 'right',
          width: 220,
        },
      ],
      defColumns: [
        {
          title: '序号',
          dataIndex: 'index',
          align: 'left',
          isDisplay: 1,
          key: 'index',
          width: 80,
        },
        {
          title: '飞行器',
          dataIndex: 'deviceName',
          align: 'left',
          isDisplay: 1,
          key: 'deviceName',
        },
        {
          title: '状态',
          dataIndex: 'status',
          align: 'left',
          isDisplay: 1,
          key: 'status',
        },
        {
          title: '飞行器状态',
          dataIndex: 'mode_code',
          align: 'left',
          isDisplay: 1,
          key: 'mode_code',
        },
        {
          title: '执行任务',
          dataIndex: 'taskName',
          align: 'left',
          isDisplay: 1,
          key: 'taskName',
        },
        {
          title: '电池1剩余电量(%)',
          dataIndex: 'battery0',
          align: 'left',
          isDisplay: 1,
          key: 'battery0',
        },
        {
          title: '电池2剩余电量(%)',
          dataIndex: 'battery1',
          align: 'left',
          isDisplay: 1,
          key: 'battery1',
        },
        {
          title: '摄像头1',
          dataIndex: 'cameraA',
          align: 'left',
          isDisplay: 1,
          key: 'cameraA',
        },
        {
          title: '摄像头2',
          dataIndex: 'cameraB',
          align: 'left',
          isDisplay: 1,
          key: 'cameraB',
        },
        {
          title: '搜星状态',
          dataIndex: 'position_state',
          align: 'left',
          key: 'position_state',
        },
        /*  {
           title: '收敛',
           dataIndex: 'is_fixed',
           align: 'left',
           key: 'is_fixed',
         },
         {
           title: '搜星档位',
           dataIndex: 'quality',
           align: 'left',
           key: 'quality',
         },
         {
           title: 'GPS 搜星数量',
           dataIndex: 'gps_number',
           align: 'left',
           key: 'gps_number',
         },
         {
           title: 'RTK 搜星数量',
           dataIndex: 'rtk_number',
           align: 'left',
           key: 'rtk_number',
         }, */
        {
          title: '剩余飞行时间(分钟)',
          dataIndex: 'remain_flight_time',
          align: 'left',
          key: 'remain_flight_time',
        },
        {
          title: '返航所需电量',
          dataIndex: 'return_home_power',
          align: 'left',
          key: 'return_home_power',
        },
        {
          title: '强制降落电量(%)',
          dataIndex: 'landing_power',
          align: 'left',
          key: 'landing_power',
        },

        {
          title: '飞行器累计飞行总里程(公里)',
          dataIndex: 'total_flight_distance',
          align: 'left',
          key: 'total_flight_distance',
        },
        {
          title: '飞行器累计飞行航时(分钟)',
          dataIndex: 'total_flight_time',
          align: 'left',
          key: 'total_flight_time',
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'left',
          key: 'action',
          fixed: 'right',
          width: 220,
        },
      ],
      tableData: [],
      detail: {
        show: false,
        model: {},
      },
      videoModal: {
        show: false,
        model: {},
      },
      mapModal: {
        show: false,
        model: {},
      },
      modalInfo: {
        show: false,
        model: {},
      },
      columnsSetting: [],
    };
  },
  computed: {},
  created() {
    this.getData()
    this.columns = window.localStorage.getItem('deviceinfo_columns') ? JSON.parse(localStorage.getItem('deviceinfo_columns')) : this.initColumns
  },
  methods: {
    getData() {
      let data = { page: this.ipagination.current, limit: this.ipagination.pageSize }
      getDeviceInfo(data).then(res => {
        let setList = res.rows.map(item => {
          if (item.battery.batteries.length > 0) {
            item.battery.batteries.forEach(k => {
              item[`battery${k.index}`] = k.capacity_percent + '%'
            })
          }
          item.total_flight_distance = item.total_flight_distance / 1000
          item.total_flight_time = item.total_flight_time / 60
          item.lastTime = moment(item.lastTime).format('YYYY-MM-DD HH:mm:ss')
          item.is_fixed = item.position_state.is_fixed
          item.quality = item.position_state.quality
          item.gps_number = item.position_state.gps_number
          item.rtk_number = item.position_state.rtk_number
          return item
        })
        this.tableData = setList
        this.ipagination.total = res.totalCount
      }).catch(err => {
        console.log(err);
      })
    },
    handleModal(record) {
      this.detail = {
        show: true,
        model: { ...record },
      };
    },
    handleVideoModal(value) {
      this.videoModal = {
        show: true,
        model: {...value},
      };
    },
    handleMapModal() {
      this.mapModal = {
        show: true,
        model: {},
      };
    },
    handleShow(value,title){
      this.modalInfo = {
        show: true,
        model: {
          ...value,
          title: title,
        }
      }
    },
    handleColumnSetting(list) {
      this.columns = list
      window.localStorage.setItem('deviceinfo_columns', JSON.stringify(this.columns))
      console.log(this.columns);
      this.defColumns.forEach(item => {
        this.columns.forEach(k => {
          if (item.key == k.key) {
            item.isDisplay = k.isDisplay
          }
        })
      })
      this.handClose()
    },
    handleSetColumns() {
      this.isAction = true
    },

    handClose() {
      this.detail.show = false;
      this.isAction = false;
      this.videoModal.show = false;
      this.modalInfo.show = false;
    },
    searchQuery() {

      this.getData();
    },
    resetQuery() { },
    onChange(pagination, filters, sorter, extra) {
      console.log('params', pagination, filters, sorter, extra);
      this.ipagination = pagination;
      this.getData();
    }
  },
};
</script>

<style scoped lang="less">
.pages {
  width: 100%;
  padding: 12px;
  background-color: #fff;

  .table-page-search-wrapper {
    padding: 12px;
  }
}

.activeStatus {
  color: #23B107;
}

.actionSet {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.margin-left-s {
  margin-left: 8px;
}
</style>
