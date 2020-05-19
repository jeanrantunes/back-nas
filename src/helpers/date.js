export const plusOneDay = date => {
  const d = new Date(date)
  const addded = new Date(d.setDate(d.getDate() + 1))
  return new Date(addded.setTime(addded.getTime() + 1))
}
