export const drawImageFromBytes = (data: string) => {
  const hexString = data.slice(2)
  const arrayBufferView = new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
  const blob = new Blob([arrayBufferView], { type: `image/jpeg` })
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(blob)

  return imageUrl
}