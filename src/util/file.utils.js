export function obtainImage(file, target) {
  let formData = new FormData();

  formData.append('file', file);
  formData.append('target', target);

  return formData;
}
