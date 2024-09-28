<template>
  <a-modal :visible="visible" title="查看实时视频" width="70vw" :footer="false" @cancel="(e) => $emit('handClose')">
    <div>
      <video ref="videoPlayer" style="width: 100%; height: 400px;" class="video-js vjs-default-skin" controls ></video>
    </div>
  </a-modal>
</template>

<script>
import { Modal } from 'ant-design-vue';
import { getLive } from '@/api/index';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
export default {
  components: {
    AModal: Modal,
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
      player: null,
    };
  },
  computed: {},
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let data = {
        deviceSn: this.model.deviceSn,
      };
      getLive(data).then(res => {
        console.log(res,);
        this.player = videojs(this.$refs.videoPlayer, {
          controls: true,
          autoplay: false,
          preload: 'auto',
          sources: [{
            src: 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', // 替换为你的视频地址
            type: 'video/mp4'
          }]
        });
      })
    },
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>

<style scoped lang="less"></style>
