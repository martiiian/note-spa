/**
 * Convert from FormData to Object
 *
 * @param formData
 * @returns {{[p: string]: any}}
 */
export function convertFormDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

/**
 * Get unique(max id +1) id for insert in store
 *
 * @param data
 * @returns {number}
 */
export function getUniqueId(data: any[]): number {
  return Math.max(...data.map(i => i.id)) + 1
}
