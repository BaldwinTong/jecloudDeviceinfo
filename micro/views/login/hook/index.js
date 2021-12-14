import { toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { doLogin } from '@micro/api';
import { message } from 'ant-design-vue';
import { useGlobalStore } from '@micro/store/global-store';

/**
 *登录操作
 *
 * @export
 * @param {*} form
 * @param {*} model
 */
export function useLogin(form, model) {
  const router = useRouter();
  const globalStore = useGlobalStore();

  // 登录系统
  function login() {
    form.value.validate().then(() => {
      // 获取原始对象
      const vals = toRaw(model);
      // 提交登录
      doLogin(vals)
        .then((authorization) => {
          // 更改语言
          globalStore.setLocale(vals.j_locale);
          // token
          globalStore.setToken(authorization);

          router.push({ name: 'Home' }); //跳转首页
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
