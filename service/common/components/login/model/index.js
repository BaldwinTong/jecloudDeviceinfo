import { reactive } from 'vue';

export function useModel() {
  // 表单数据
  const model = reactive({
    j_username: '', // 用户名
    j_password: '', // 密码
    code: '', // 验证码
  });

  // 校验规则
  const rules = {
    j_username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    j_password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  };
  return { model, rules };
}
