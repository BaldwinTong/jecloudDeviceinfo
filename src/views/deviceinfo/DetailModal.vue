<template>
  <a-modal :visible="visible" title="详情" width="87vw" :footer="false" @cancel="(e) => $emit('handClose')">
    <div class="baseInfo">
      <div>
        <img class="avatar" src="./images/logos.png" alt="" />
      </div>
      <div class="info">
        <div>
          <span class="name">{{ model.deviceName }}</span><!-- {{model.}} -->
          <span style="margin-left: 10px">
            <a-tag v-if="model.status == 1" color="#23B107">在线</a-tag>
            <a-tag v-else>离线</a-tag>
          </span>
        </div>
        <div class="desc">
          <div class="descItem">
            <span class="label">飞行器型号：</span>
            <span class="value">{{ model.model || '--' }}</span>
          </div>
          <div class="descItem">
            <span class="label">设备序号：</span>
            <span class="value">{{ model.deviceSn || '--' }}</span>
          </div>
          <div class="descItem">
            <span class="label">固件版本：</span>
            <span class="value">{{ model.firmware_version || '--' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 30px">
      <a-tabs v-model:activeKey="activeKey" tab-position="left" size="small">
        <a-tab-pane key="1" tab="实时信息">
          <a-descriptions title="实时信息" :column="5">
            <a-descriptions-item>
              <template #label class="label">飞行器状态</template>
              <span class="value">{{ ModeCode[model.mode_code] || '--' }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">当前执行任务</template>
              <a v-if="model.taskName" class="value">{{ model.taskName || '--' }}</a>
              <span v-else>--</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">当前经度(°)</template>
              <span class="value">{{ model.longitude || '--' }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">当前纬度(°)</template>
              <span class="value">{{ model.latitude || '--' }}</span>
            </a-descriptions-item>

            <a-descriptions-item>
              <template #label class="label">剩余飞行时间(分钟)</template>
              <span class="value">{{ model.remain_flight_time || '--' }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">返航所需电量百分比</template>
              <span class="value">{{ model.return_home_power || '0' }}%</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">强制降落电量百分比</template>
              <span class="value">{{ model.landing_power || '0' }}%</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">最后上线时间</template>
              <span class="value">{{ model.lastTime || '--' }}</span>
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="2" tab="电池信息">
          <a-descriptions title="电池信息" :column="5">
            <a-descriptions-item>
              <template #label class="label">电池1剩余电量</template>
              <span class="value">{{ model.battery.batteries[0].capacity_percent || 0 }}%</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">电池1电池循环次数</template>
              <span class="value">{{ model.battery.batteries[0].loop_times }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">电池2剩余电量</template>
              <span class="value">{{ model.battery.batteries[1].capacity_percent || 0 }}%</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">电池2电池循环次数</template>
              <span class="value">{{ model.battery.batteries[1].loop_times }}</span>
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="3" tab="摄像头信息">
          <a-descriptions title="摄像头信息" :column="1">
            <a-descriptions-item>
              <a-descriptions title="摄像头1" :column="5">
                <a-descriptions-item>
                  <template #label class="label">剩余拍照张数</template>
                  <span class="value">{{ model.remain_photo_num || '--' }}</span>
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label class="label">剩余录像时间(分钟)</template>
                  <span class="value">{{ (model.remain_record_duration >= 0 ? model.remain_record_duration : 0) / 60
                  }}</span>
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label class="label">相机模式</template>
                  <span class="value">{{ model.camera_mode || '--' }}</span>
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label class="label">拍照状态</template>
                  <span class="value">{{ model.photo_state || '--' }}</span>
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label class="label">录像状态</template>
                  <span class="value">{{ model.recording_state || '--' }}</span>
                </a-descriptions-item>
              </a-descriptions>
            </a-descriptions-item>
            <a-descriptions-item>
              <a-descriptions title="摄像头2" :column="5">
                <a-descriptions-item>
                  <template #label class="label">剩余拍照张数</template>
                  <span class="value">{{ model.cameras.remain_photo_num || '--' }}</span>
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label class="label">剩余录像时间(分钟)</template>
                  <span class="value">{{ (model.cameras.remain_record_duration >= 0 ? model.remain_record_duration : 0) /
                    60
                  }}</span>
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label class="label">相机模式</template>
                  <span class="value">{{ model.cameras.camera_mode || '--' }}</span>
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label class="label">拍照状态</template>
                  <span class="value">{{ model.cameras.photo_state || '--' }}</span>
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label class="label">录像状态</template>
                  <span class="value">{{ model.cameras.recording_state || '--' }}</span>
                </a-descriptions-item>
              </a-descriptions>
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="4" tab="累计飞行数据">
          <a-descriptions title="累计飞行数据" :column="5">
            <a-descriptions-item>
              <template #label class="label">飞行器累计飞行航时(小时)</template>
              <span class="value">{{ (model.total_flight_time >= 0 ? model.total_flight_time : 0) / 60 }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">飞行器累计飞行总里程(公里)</template>
              <span class="value">{{ model.total_flight_distance }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">飞行次数(次)</template>
              <span class="value">{{ model.airNum || '--' }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">最长里程(米)</template>
              <span class="value">{{ model.maxDistance || '--' }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">最高起飞海拔(米)</template>
              <span class="value">{{ model.maxHeight || '--' }}</span>
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="5" tab="搜星状态">
          <a-descriptions title="搜星状态" :column="5">
            <a-descriptions-item>
              <template #label class="label">收敛</template>
              <span class="value">{{ isFixed[model.position_state.is_fixed] || '--' }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">搜星档位</template>
              <span class="value">{{ quality[model.position_state.quality] || '--' }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">GPS 搜星数量</template>
              <span class="value">{{ model.position_state.gps_number || '--' }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">RTK 搜星数量</template>
              <span class="value">{{ model.position_state.rtk_number || '--' }}</span>
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="6" tab="容量信息">
          <a-descriptions title="容量信息" :column="5">
            <a-descriptions-item>
              <template #label class="label">总容量(KB)</template>
              <span class="value">{{ model.storage.total || '--' }}</span>
            </a-descriptions-item>
            <a-descriptions-item>
              <template #label class="label">已使用容量(KB)</template>
              <span class="value">{{ model.storage.used || '--' }}</span>
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-modal>
</template>

<script>
import { Modal, Descriptions, Tag, Tabs } from 'ant-design-vue';
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
let quality = {
  1: '1档',
  2: '2档',
  3: '3档',
  4: "4档",
  5: "5档"
}
let isFixed = {
  0: '未开始',
  1: '收敛中',
  2: '收敛成功',
  3: "收敛失败",
}

export default {
  components: {
    AModal: Modal,
    ADescriptions: Descriptions,
    ADescriptionsItem: Descriptions.Item,
    ATag: Tag,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,

  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    model: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      activeKey: '1',
      ModeCode,
      quality,
      isFixed,
    };
  },
  computed: {},
  created() { },
  methods: {},
};
</script>

<style scoped lang="less">
.baseInfo {
  display: flex;
  width: 100%;

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 16px;
    padding: 6px 0;
    flex: 1;
  }

  .name {
    height: 28px;
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 500;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .desc {
    width: 100%;
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 400;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.45);
    font-style: normal;
    text-transform: none;
    display: flex;

    .descItem {
      width: 33%;
    }
  }
}

:deep(.ant-descriptions-item-label) {
  color: rgba(0, 0, 0, 0.45);
}

:deep(.ant-descriptions-item-label) {
  color: rgba(0, 0, 0, 0.45);
}

.label {
  height: 22px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 400;
  font-size: 14px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  line-height: 22px;
  text-align: right;
  font-style: normal;
  text-transform: none;
}

.value {
  height: 22px;
  font-family: Source Han Sans, Source Han Sans;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 22px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.avatar {
  width: 82px;
  height: 82px;
}
</style>
