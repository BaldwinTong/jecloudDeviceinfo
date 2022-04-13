<template>
  <div class="je-login-view">
    <a-form ref="form" class="login-form" :model="model" v-bind="layout" :rules="rules">
      <div class="login-title">{{ $t('login.title') }}</div>
      <a-form-item has-feedback :label="$t('login.username')" name="j_username">
        <a-input
          v-model:value="model.j_username"
          autocomplete="off"
          :placeholder="$t('login.usernamePlaceholder')"
          @pressEnter="login"
        />
      </a-form-item>
      <a-form-item has-feedback :label="$t('login.password')" name="j_password">
        <a-input-password
          v-model:value="model.j_password"
          autocomplete="off"
          :placeholder="$t('login.passwordPlaceholder')"
          @pressEnter="login"
        />
      </a-form-item>
      <a-form-item has-feedback :label="$t('login.language')" name="j_locale">
        <a-select ref="select" v-model:value="model.j_locale" @change="changeI18n">
          <a-select-option
            v-for="(item, index) in globalStore.locales"
            :key="index"
            :value="item.code"
            >{{ item.text }}</a-select-option
          >
        </a-select>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 24 }" style="text-align: center">
        <a-button type="primary" @click="login">{{ $t('login.loginText') }}</a-button>
        <a-button style="margin-left: 10px" @click="form.resetFields()">{{
          $t('login.resetText')
        }}</a-button>
      </a-form-item>
    </a-form>
    <div class="net"><a href="http://jecloud.net/" target="_blank">京ICP备18023569号-7</a></div>
  </div>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { Form, Button, Input, Select } from 'ant-design-vue';
  import { useModel } from './model';
  import { useLogin } from './hook';
  import { useGlobalStore } from '@common/store/global-store';
  import { changeI18n } from '@common/locales';
  export default defineComponent({
    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AButton: Button,
      AInput: Input,
      AInputPassword: Input.Password,
      ASelect: Select,
      ASelectOption: Select.Option,
    },
    setup() {
      const form = ref();
      const globalStore = useGlobalStore();
      // 表单数据，校验规则
      const { model, rules } = useModel();
      // 登录函数
      const { login } = useLogin(form, model);
      model.j_locale = globalStore.locale;
      return {
        changeI18n,
        globalStore,
        rules,
        model,
        form,
        login,
        layout: {
          labelCol: {
            span: 6,
          },
          wrapperCol: {
            span: 14,
          },
        },
      };
    },
  });
</script>
<style lang="less" scoped>
  .je-login-view {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 5%;
    .login-form {
      width: 600px;
      padding: 10px;
      border: 1px solid @border-color-split;
      box-shadow: 2px 2px 5px @border-color-split;
      background: @component-background;
      .login-title {
        text-align: center;
        padding: 20px;
        font-size: 30px;
      }
    }
  }
  .net {
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: center;
    padding: 20px;
  }
</style>
