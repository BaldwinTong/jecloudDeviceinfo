<template>
  <div class="je-login-view">
    <Form ref="form" class="login-form" :model="model" v-bind="layout" :rules="rules">
      <div class="login-title"><img :src="logo" /></div>
      <FormItem has-feedback name="account">
        <Input
          v-model:value="model.account"
          class="input-item"
          autocomplete="off"
          :placeholder="$t('login.usernamePlaceholder')"
          @pressEnter="login()"
        >
          <template #prefix>
            <i class="fal fa-tablet-android-alt" style="padding-right: 5px"></i>
          </template>
        </Input>
      </FormItem>
      <FormItem has-feedback name="password">
        <InputPassword
          v-model:value="model.password"
          class="input-item"
          autocomplete="off"
          :placeholder="$t('login.passwordPlaceholder')"
          @pressEnter="login()"
        >
          <template #prefix>
            <i class="fal fa-lock" style="padding-right: 5px"></i>
          </template>
        </InputPassword>
      </FormItem>
      <FormItem has-feedback name="locale">
        <RadioGroup
          v-model:value="globalStore.locale"
          class="login-locale"
          :options="globalStore.locales.map((item) => ({ label: item.text, value: item.code }))"
        />
      </FormItem>

      <FormItem :wrapper-col="{ span: 24 }" style="text-align: center">
        <Button type="primary" class="login-btn" block @click="login()">{{
          $t('login.loginText')
        }}</Button>
      </FormItem>
    </Form>
    <div class="net"><a href="http://jecloud.net/" target="_blank">京ICP备18023569号-7</a></div>
  </div>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { Form, Button, Input, Radio } from '@jecloud/ui';
  import { useModel } from './model';
  import { useLogin } from './hook';
  import { useGlobalStore } from '@common/store/global-store';
  import logo from '../../assets/image/login-logo.png';
  export default defineComponent({
    components: {
      Form,
      FormItem: Form.Item,
      Button,
      Input,
      InputPassword: Input.Password,
      RadioGroup: Radio.Group,
    },
    setup() {
      const form = ref();
      const globalStore = useGlobalStore();
      // 表单数据，校验规则
      const { model, rules } = useModel();
      // 登录函数
      const { login } = useLogin(form, model);
      return {
        globalStore,
        rules,
        model,
        form,
        login,
        logo,
        layout: {
          // labelCol: {
          //   span: 6,
          // },
          // wrapperCol: {
          //   span: 14,
          // },
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
    background-image: url('../../assets/image/login-bg.png');
    background-size: cover;
    .login-form {
      width: 440px;
      height: 540px;
      padding: 10px 50px;
      border: 1px solid @border-color-base;
      box-shadow: 2px 2px 5px @border-color-base;
      background: @component-background;

      .input-item {
        border-radius: 2px;
        font-size: 12px;
        color: #a1a1a1;
        line-height: 46px;
        height: 46px;

        :deep(.ant-input-clear-icon) {
          top: 12px !important;
        }
      }
      .login-btn {
        height: 42px;
        margin-top: 40px;
        font-size: 18px;
        color: #ffffff;
        line-height: 20px;
        font-family: 'PingFang SC, PingFang SC-Normal';
      }
      .login-title {
        text-align: center;
        padding: 20px 0 50px;
        img {
          height: 80px;
        }
      }
      .login-locale {
        & > :deep(.ant-row) {
          justify-content: flex-end;
        }
      }
    }
  }
  .net {
    position: absolute;
    width: 100%;
    bottom: 0;
    text-align: center;
    padding: 20px;
    a {
      color: @white;
    }
  }
</style>
<style lang="less">
  .je-login-view-dept-modal {
    .dept-list {
      padding-bottom: 20px;
      &-item {
        padding: 5px;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>
