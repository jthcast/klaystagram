import { cx } from '@emotion/css'

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
      className={cx(
        // { [cssButton]: true },
        { [className]: className ? true : false }
      )}
      href={link}
      target='_blank'
      rel='noreferrer noopener'
    >
      {title}
    </a>
  )
}
