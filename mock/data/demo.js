import mockjs from 'mockjs';
import { createMock, resultInfo, resultList } from '../util';

/* 请求参数query，只有当get请求时起效 */

/**
 * 获取普通数据
 */
const info = createMock('/deom/getInfoById', ({ headers, query }) => {
  return resultInfo({ headers, query });
});

/**
 *  获取列表数据
 */
const list = createMock('/deom/load', ({ headers, query }) => {
  const rows = mockjs.mock({
    'rows|5-10': [
      {
        'name|1': ['张三', '李四', '王五'],
        'age|10-20': 20,
      },
    ],
  });
  return resultList(rows.rows);
});

/**
 * 自定义数据
 */
const custom = createMock('/deom/custom', ({ headers, query }) => {
  const data = mockjs.mock({
    'name|1': ['张三', '李四', '王五'],
    'age|10-20': 20,
  });
  return data;
});

/**
 * 返回mock数据，必须是数组，插件规定
 */
export default [info, list, custom];
