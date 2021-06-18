import { css } from '@emotion/css'
import { useState } from 'react'
import { KLAYTN_SCOPE } from '../../constants/url'
import globalCss from '../../styles/global-css'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import LinkNewTab from '../atoms/LinkNewTab'
import Tooltip from '../atoms/Tooltip'

interface ICopyrightInfo {
  id?: string
  originalOwner?: string
  currentOwner?: string
}

export default function CopyrightInfo({
  id,
  originalOwner,
  currentOwner,
}: ICopyrightInfo) {
  const [isShowInfo, setShowInfo] = useState(false)

  function toogleShowInfo() {
    setShowInfo(!isShowInfo)
  }

  return (
    <>
      <Button
        className={cssCopyrightInfoButton}
        title="Copyright Info"
        onClick={toogleShowInfo}
        ghost
      >
        <Icon iconName="copyright" />
      </Button>
      {isShowInfo && (
        <Tooltip title={id}>
          <>
            <p>Original Owner</p>
            <LinkNewTab
              className={cssLink}
              link={`${KLAYTN_SCOPE}account/${originalOwner}`}
              title={originalOwner}
            />
            <p>Current Owner</p>
            <LinkNewTab
              className={cssLink}
              link={`${KLAYTN_SCOPE}account/${currentOwner}`}
              title={currentOwner}
            />
          </>
        </Tooltip>
      )}
    </>
  )
}

const cssCopyrightInfoButton = css`
  font-size: 1.5rem;
`

const cssLink = css`
  color: ${globalCss.color.colorDown};

  &:visited {
    color: ${globalCss.color.colorDown};
  }
`
