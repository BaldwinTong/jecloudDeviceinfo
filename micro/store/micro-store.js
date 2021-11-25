/* 微应用数据store，主子应用通信唯一渠道 */
let microStore;

export function setupMicroStore(store) {
  microStore = store;
}

export function useMicroStore() {
  return microStore;
}
