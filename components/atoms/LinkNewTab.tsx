interface ILinkNewTab {
  className?: string
  link?: string
  title?: string
}

export default function LinkNewTab({
  className,
  link,
  title
}: ILinkNewTab) {

  return (
    <a
      className={className}
      href={link}
      target='_blank'
      rel='noreferrer noopener'
    >
      {title}
    </a>
  )
}
