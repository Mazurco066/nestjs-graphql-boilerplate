export const beautify = (json: Object, propsToRemove: Array<string>) => {
  propsToRemove.forEach((propName) => {
    delete json[propName]
  })
  return json
}