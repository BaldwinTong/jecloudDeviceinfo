import { toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { doLogin } from '@micro/api';
import { message } from 'ant-design-vue';
import { useLocale } from '@micro/hooks/use-i18n';
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
  const { getLocales, getLocale, changeLocale } = useLocale();
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
          globalStore.locale = vals.j_locale;
          changeLocale(vals.j_locale).then((i18n) => {
            message.success(i18n.global.t('login.loginSuccess'));
          });
          // 登录成功
          JE.cookie.set('authorization', authorization, 7);
          router.push('/'); //跳转首页
        })
        .catch((e) => {
          // 登录失败
          message.error(e.message);
          // 验证码
          if (e.code == 'WARNCODE') {
            model.code = e.obj;
          }
        });
    });
  }

  return { login, locales: getLocales(), getLocale };
}
