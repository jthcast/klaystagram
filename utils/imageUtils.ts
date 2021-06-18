export function drawImageFromBytes(data: string) {
  const hexString = data.slice(2)
  const arrayBufferView = new Uint8Array(
    hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  )
  const blob = new Blob([arrayBufferView], { type: `image/jpeg` })
  const urlCreator = window.URL || window.webkitURL
  const imageUrl = urlCreator.createObjectURL(blob)

  return imageUrl
}

export function getDataUrlFromFile(file: Blob | File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = reject
  })
}

export function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve(img)
    }
    img.onerror = reject
    img.src = src
  })
}

export function drawImageInCanvas(
  img: HTMLImageElement,
  maxWidthOrHeight: number
) {
  const canvas = document.createElement(`canvas`)
  const ctx = canvas.getContext(`2d`)

  if (
    Number.isInteger(maxWidthOrHeight) &&
    (img.width > maxWidthOrHeight || img.height > maxWidthOrHeight)
  ) {
    if (img.width > img.height) {
      canvas.width = maxWidthOrHeight
      canvas.height = (img.height / img.width) * maxWidthOrHeight
    } else {
      canvas.width = (img.width / img.height) * maxWidthOrHeight
      canvas.height = maxWidthOrHeight
    }
  } else {
    canvas.width = img.width
    canvas.height = img.height
  }
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

  return canvas
}

export function getFileFromDataUrl(
  dataUrl: string,
  fileName: string,
  lastModified = Date.now()
) {
  return new Promise<File | Blob>((resolve) => {
    const arr = dataUrl.split(`,`)
    const mime = arr[0].match(/:(.*?)/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    let file: File | Blob
    try {
      file = new File([u8arr], fileName, { type: mime, lastModified }) // Edge do not support File constructor
    } catch (error) {
      file = new Blob([u8arr], { type: mime })
    }
    resolve(file)
  })
}
