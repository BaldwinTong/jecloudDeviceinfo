import { reactive } from 'vue';

export function useModel() {
  // 表单数据
  const model = reactive({
    account: '', // 用户名
    password: '', // 密码
    code: '', // 验证码
    device: 'PC', // 登录设备
  });

  // 校验规则
  const rules = {
    account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };
  return { model, rules };
}
