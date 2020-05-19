export const stringGenerator = (
  length = 8,
  stringPossible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
) =>
  Array.from({ length }).reduce(
    acc =>
      acc +
      stringPossible.charAt(Math.floor(Math.random() * stringPossible.length)),
    ''
  )

export const emailGenerator = (length = 5) => {
  const string = stringGenerator(length)
  const domain = stringGenerator(5)

  return `${string}@${domain}.com`
}

export const dateGenerator = (
  start = new Date(1956, 0, 1),
  end = new Date()
) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}
