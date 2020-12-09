const removeQuete = str => {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== '"') {
      result += str[i]
    }
  }
  return result
}
export default (obj): object => {
  const newData = {}
  for (let key in obj) {
    if (key === 'image' || key === 'tag') {
      newData[key] = JSON.parse(obj[key])
    } else {
      newData[key] =
        typeof obj[key] === 'string' ? removeQuete(obj[key]) : obj[key]
    }
  }
  return newData
}
