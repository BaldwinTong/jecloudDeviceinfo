<template>
  <a-modal :visible="visible" :title="modalTitle" width="60vw" :footer="false" @cancel="(e) => $emit('handClose')">
    <a-descriptions title=" " :column="3">
      <template v-if="model.title == '摄像头'">
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
      </template>
      <template v-else>
        <a-descriptions-item>
          <template #label class="label">收敛</template>
          <span class="value">{{ isFixed[model.is_fixed] || '--' }}</span>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label class="label">搜星档位</template>
          <span class="value">{{ quality[model.quality] || '--' }}</span>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label class="label">GPS 搜星数量</template>
          <span class="value">{{ model.gps_number || '--' }}</span>
        </a-descriptions-item>
        <a-descriptions-item>
          <template #label class="label">RTK 搜星数量</template>
          <span class="value">{{ model.rtk_number || '--' }}</span>
        </a-descriptions-item>
      </template>
    </a-descriptions>
  </a-modal>
</template>

<script>
import { Modal, Descriptions } from 'ant-design-vue';
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
      ModeCode,
      quality,
      isFixed,
      modalTitle: ''
    };
  },
  computed: {},
  created() {
    this.modalTitle = this.model.title
  },
  methods: {},
};
</script>

<style scoped lang="less">
:deep(.ant-descriptions-header) {
  margin-bottom: 0px;
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
</style>
