export const getRandomString = () => {
  const randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  while (result.length < 20) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length))
  }
  return result
}

export const getNormalizeDate = (date) =>
  `${new Date(date).toDateString()} ${new Date(date).getHours()}:${
    new Date(date).getMinutes() < 10
      ? `0${new Date(date).getMinutes()}`
      : new Date(date).getMinutes()
  }`

export const changeDetailsCount = (currentStation, currentAuto, details) => {
  const detailsForOrder = []
  const autoIndex = currentStation.acceptableAutos.findIndex(
    (auto) => currentAuto === auto.name,
  )
  details.forEach((detailForOrder) => {
    currentStation.acceptableAutos[autoIndex].details.forEach((detail) => {
      if (detailForOrder.name === detail.name) {
        detailsForOrder.push({
          name: detailForOrder.name,
          count: Number(detailForOrder.count) + Number(detail.count),
        })
      }
    })
    const match = currentStation.acceptableAutos[autoIndex].details.find(
      (findDetail) => findDetail.name === detailForOrder.name,
    )
    if (!match) {
      detailsForOrder.push({
        ...detailForOrder,
        count: Number(detailForOrder.count),
      })
    }
  })
  return detailsForOrder
}
