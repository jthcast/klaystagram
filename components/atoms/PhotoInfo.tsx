import { css } from '@emotion/css'
import globalCss from '../../styles/global-css'

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
    <div className={cssContainer}>
      <h2 className={cssFileName}>{name}</h2>
      <p>{caption}</p>
      <span className={cssIssueDate}>{issueDate}</span>
    </div>
  )
}

const cssContainer = css`
  padding: 1rem;
  background-color: ${globalCss.color.backgroundColor};
  border-left: 0.1rem solid ${globalCss.color.borderColor};
  border-bottom: 0.1rem solid ${globalCss.color.borderColor};
  height: 100%;
`

const cssFileName = css`
  font-size: 1rem;
`

const cssIssueDate = css`
  color: ${globalCss.color.colorDown};
  font-size: 0.75rem;
`