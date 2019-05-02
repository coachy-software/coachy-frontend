export const route = (path, component, data = {}, meta = {}) => ({
  path, component, name: component.name, ...data, meta
});