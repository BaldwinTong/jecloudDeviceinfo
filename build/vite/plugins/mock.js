/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(envs, command) {
  return viteMockServe({
    mockPath: 'mock/data',
    localEnabled: true,
    prodEnabled: false,
    supportTs: false,
  });
}
