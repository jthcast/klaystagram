import { css } from '@emotion/css'
import { KLAYTN_SCOPE } from '../../constants/url'
import globalCss from '../../styles/global-css'
import ui from '../../utils/ui'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import LinkNewTab from '../atoms/LinkNewTab'

interface IToast {
  toast?: {
    status?: string
    message?: string
    link?: string
  }
}

export default function Toast({ toast }: IToast) {
  const { status, message, link } = toast || {}
  return (
    toast && (
      <div className={cssToast}>
        <div className={cssStatus(status)}>{status}</div>
        <p className={cssMessage}>{message}</p>
        {link && (
          <p className={cssLinkWrapper}>
            <Icon iconName="receipt" />
            <LinkNewTab
              className={cssLink}
              link={`${KLAYTN_SCOPE}tx/${link}`}
              title={link}
            />
          </p>
        )}
        <Button
          className={cssButton}
          ghost
          onClick={ui.hideToast}
          title="Close"
        >
          <Icon iconName="times" />
        </Button>
      </div>
    )
  )
}

const cssToast = css`
  position: fixed;
  top: 2rem;
  right: 2rem;
  width: 20rem;
  max-width: 90vw;
  background-color: ${globalCss.color.backgroundColor};
  box-shadow: 0 0 5px 1px ${globalCss.color.borderColor};
  border-radius: 0.25rem;
  padding: 0.75rem;
  z-index: 3;
  overflow-wrap: break-word;

  @media ${globalCss.breakpoint.mobileQuery} {
    top: 3.5rem;
    left: 50%;
    transform: translate(-50%, 0);
  }
`

const cssStatus = (status: string) => css`
  display: inline-block;
  color: ${status === `fail` || status === `error`
    ? globalCss.color.colorCode
    : globalCss.color.color};
  background-color: ${status === `fail` || status === `error`
    ? globalCss.color.backgroundCode
    : globalCss.color.groupColor};
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
  font-weight: bold;
`

const cssMessage = css`
  margin-bottom: 0.25rem;
  font-size: 0.75rem;
`

const cssLinkWrapper = css`
  display: flex;
  align-items: center;

  svg {
    margin: 0.1rem 0.1rem 0 0;
  }
`

const cssLink = css`
  color: ${globalCss.color.colorDown};
  font-size: 0.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const cssButton = css`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
