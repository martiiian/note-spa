export function convertFormDataToObject(formData) {
  return Object.fromEntries(formData.entries());
}
