import { css, cx } from '@emotion/css'
import globalCss from '../../styles/global-css'

interface IPhotoInfo {
  className?: string
  name: string
  issueDate?: string
  caption?: string
}

export default function PhotoInfo({
  className,
  name,
  issueDate,
  caption,
}: IPhotoInfo) {
  return (
    <div className={cx({ [cssContainer]: true }, { [className]: !!className })}>
      <h2 className={cssFileName}>{name}</h2>
      <p>{caption}</p>
      <span className={cssIssueDate}>{issueDate}</span>
    </div>
  )
}

const cssContainer = css`
  padding: 1rem;
  height: 100%;
  overflow: auto;
  overflow-wrap: break-word;
`

const cssFileName = css`
  font-size: 1rem;
`

const cssIssueDate = css`
  color: ${globalCss.color.colorDown};
  font-size: 0.75rem;
`
