interface IPhotoInfo {
  name: string
  issueDate?: string
  caption?: string
}

export default function PhotoInfo({
  name,
  issueDate,
  caption
}: IPhotoInfo) {

  return (
    <>
      <h2>{name}</h2>
      <p>{caption}</p>
      <span>{issueDate}</span>
    </>
  )
}
