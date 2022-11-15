/**
 * Convert from FormData to Object
 *
 * @param formData
 * @returns {{[p: string]: any}}
 */
function convertFormDataToObject(formData: FormData): {[key: string]: unknown} {
  return Object.fromEntries(formData.entries())
}

/**
 * Get unique(max id +1) id for insert in store
 *
 * @param data
 * @returns {number}
 */
function getUniqueId<T extends ({[key: string]: unknown, id: number})[]>(data: T): number {
  return Math.max(...data.map(i => i.id)) + 1
}

export {
  convertFormDataToObject,
  getUniqueId
}
