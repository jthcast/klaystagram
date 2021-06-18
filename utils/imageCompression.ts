import {
  drawImageInCanvas,
  getDataUrlFromFile,
  getFileFromDataUrl,
  loadImage,
} from './imageUtils'

export default async function imageCompression(
  file: any,
  maxSizeMB = Number.POSITIVE_INFINITY,
  maxWidthOrHeight?: number
) {
  if (!(file instanceof Blob || file instanceof File)) {
    throw new Error(`The file given is not an instance of Blob or File`)
  } else if (!/^image/.test(file.type)) {
    throw new Error(`The file given is not an image`)
  }

  const maxSizeByte = maxSizeMB * 1024 * 1024
  const dataUrl = await getDataUrlFromFile(file)
  const img = await loadImage(dataUrl)
  const canvas = drawImageInCanvas(img, maxWidthOrHeight)
  let quality = 0.9
  const { type, name, lastModified } = file as File
  let compressedFile = await getFileFromDataUrl(
    canvas.toDataURL(type, quality),
    name,
    lastModified
  )

  if (file) {
    while (compressedFile.size > maxSizeByte) {
      canvas.width *= 0.9
      canvas.height *= 0.9

      const ctx = canvas.getContext(`2d`)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      const compressedDataUrl = canvas.toDataURL(type, quality)
      compressedFile = await getFileFromDataUrl(
        compressedDataUrl,
        name,
        lastModified
      )
    }
  } else {
    while (compressedFile.size > maxSizeByte) {
      quality *= 0.9
      const compressedDataUrl = canvas.toDataURL(type, quality)
      compressedFile = await getFileFromDataUrl(
        compressedDataUrl,
        name,
        lastModified
      )
    }
  }

  return compressedFile
}
