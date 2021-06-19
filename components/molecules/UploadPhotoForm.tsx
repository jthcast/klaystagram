import { css } from '@emotion/css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { uploadPhoto } from '../../redux/modules/photos'
import globalCss from '../../styles/global-css'
import imageCompression from '../../utils/imageCompression'
import ui from '../../utils/ui'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import InputFile from '../atoms/InputFile'
import Textarea from '../atoms/Textarea'

const MAX_IMAGE_SIZE = 30000 // 30KB
const MAX_IMAGE_SIZE_MB = 0.03 // 30KB

export default function UploadPhotoForm() {
  const dispatch = useDispatch()
  const [file, setFile] = useState<File | Blob>(undefined)
  const [fileName, setFileName] = useState(``)
  const [location, setLocation] = useState(``)
  const [caption, setCaption] = useState(``)
  const [warningMessage, setWarningMessage] = useState(``)
  const [isCompressing, setCompressing] = useState(false)

  function submitHandling(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch(uploadPhoto(file as File, fileName, location, caption))
    ui.hideModal()
  }

  async function compressImage(imageFile: File) {
    try {
      const compressedFile = (await imageCompression(
        imageFile,
        MAX_IMAGE_SIZE_MB
      )) as File
      setCompressing(false)
      setFile(compressedFile)
      setFileName(compressedFile.name)
    } catch (error) {
      setCompressing(false)
      setWarningMessage(`* Fail to compress image`)
    }
  }

  function fileChangeHandling(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files[0]

    if (file.size > MAX_IMAGE_SIZE) {
      setCompressing(true)
      compressImage(file)
      return
    }
    setFile(file)
    setFileName(file.name)
  }

  function locationChangeHandling(event: React.ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value)
  }

  function captionChangeHandling(
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setCaption(event.target.value)
  }

  return (
    <form className={cssContainer} onSubmit={submitHandling}>
      <InputFile
        accept=".png, .jpg, .jpeg"
        fileName={isCompressing ? `Compressing image...` : fileName}
        label="File"
        onChange={fileChangeHandling}
        isRequire
      />
      <Input
        label="Location"
        onChange={locationChangeHandling}
        placeholder="Where did you take this photo?"
        isRequire
        value={location}
      />
      <Textarea
        label="Caption"
        onChange={captionChangeHandling}
        placeholder="Upload your memories"
        isRequire
        value={caption}
      />
      <Button className={cssButton} type="submit" title="Upload">
        Upload
      </Button>
      <p>{warningMessage}</p>
    </form>
  )
}

const cssContainer = css`
  width: 100%;
  display: grid;
  gap: 1rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    min-width: 80vw;
  }
`

const cssButton = css`
  font-weight: bold;
  padding: 0.5rem 0;
`
