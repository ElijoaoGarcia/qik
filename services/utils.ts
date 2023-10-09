const whiteSpaceChecker = (value: string): boolean => {
  if (!value) return true
  return value.trim() === ''
}

export default {
  whiteSpaceChecker
}
