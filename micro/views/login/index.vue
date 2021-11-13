<template>
  <a-row align="middle" justify="center">
    <a-col :span="8">
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
          <a-select ref="select" v-model:value="model.j_locale">
            <a-select-option v-for="(item, index) in locales" :key="index" :value="item.code">{{
              item.text
            }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 24 }" style="text-align: center">
          <a-button type="primary" @click="login">{{ $t('login.loginText') }}</a-button>
          <a-button style="margin-left: 10px" @click="form.resetFields()">{{
            $t('login.resetText')
          }}</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
<script>
  import { defineComponent, ref } from 'vue';
  import { Form, Button, Input, Row, Col, Select } from 'ant-design-vue';
  import { useModel } from './model';
  import { useLogin } from './hook';
  export default defineComponent({
    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AButton: Button,
      AInput: Input,
      AInputPassword: Input.Password,
      ARow: Row,
      ACol: Col,
      ASelect: Select,
      ASelectOption: Select.Option,
    },
    setup() {
      const form = ref();
      // 表单数据，校验规则
      const { model, rules } = useModel();
      // 登录函数
      const { login, getLocale, locales } = useLogin(form, model);
      model.j_locale = getLocale();
      return {
        rules,
        model,
        form,
        locales,
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
<style lang="less">
  .login-form {
    margin-top: 30%;
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
</style>
