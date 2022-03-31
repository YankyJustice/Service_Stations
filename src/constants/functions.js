export const getRandomString = () => {
  const randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  while (result.length < 20) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}
