import { toRaw, h } from 'vue';
import { message } from 'ant-design-vue';
import { Modal } from '@jecloud/ui';
import { isArray, loginApi } from '@jecloud/utils';
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
  function login(deptId) {
    model.deptId = deptId;
    form.value.validate().then(() => {
      // 获取原始对象
      const vals = toRaw(model);
      // 提交登录
      loginApi(vals)
        .then((token) => {
          if (isArray(token)) {
            const modal = Modal.dialog({
              title: '选择部门',
              className: 'je-login-view-dept-modal',
              width: 100,
              content() {
                return h(
                  'div',
                  { class: 'dept-list' },
                  token.map((item) =>
                    h(
                      'div',
                      {
                        class: 'dept-list-item',
                        onClick() {
                          login(item.id);
                          modal.close();
                        },
                      },
                      item.name,
                    ),
                  ),
                );
              },
              showFooter: false,
            });
          } else {
            _login({ token });
          }
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
