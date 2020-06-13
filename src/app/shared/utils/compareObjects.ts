export function compareObjects(obj1, obj2) {
  if (obj1 == null || obj2 == null) {
    return false;
  }
  if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
    return true;
  }
  let result = true;
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key)) {
      return false;
    }
    result = result && obj1[key] === obj2[key];
  }
  for (let key of keys2) {
    if (!obj1.hasOwnProperty(key)) {
      return false;
    }
    result = result && obj1[key] === obj2[key];
  }
  return result;
}
