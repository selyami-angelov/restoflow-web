export const convertUtcToLocalString = (utcTimestamp: any) => {
  const utcTime = new Date(utcTimestamp)
  const localTime = new Date(utcTime.getTime() + -new Date().getTimezoneOffset() * 60000)

  const localString = localTime.toLocaleTimeString('en-US')

  return localString
}
