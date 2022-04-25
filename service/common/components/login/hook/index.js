import { toRaw } from 'vue';
import { doLogin } from '@common/api';
import { message } from 'ant-design-vue';
import { login as _login } from '@common/helper/system';

/**
 *登录操作
 *
 * @export
 * @param {*} form
 * @param {*} model
 */
export function useLogin(form, model) {
  // 登录系统
  function login() {
    form.value.validate().then(() => {
      // 获取原始对象
      const vals = toRaw(model);
      // 提交登录
      doLogin(vals)
        .then((token) => {
          _login({ token });
        })
        .catch((e) => {
          // 登录失败
          message.error(e.message);
          // 验证码
          if (e.code == 'WARNCODE') {
            model.code = e.data;
          }
        });
    });
  }

  return { login };
}
