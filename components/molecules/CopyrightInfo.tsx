import { css } from '@emotion/css'
import { useState } from 'react'
import { KLAYTN_SCOPE } from '../../constants/url'
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
  currentOwner
}: ICopyrightInfo) {
  const [isShowInfo, setShowInfo] = useState(false)

  function toogleShowInfo(){
    setShowInfo(!isShowInfo)
  }

  return (
    <div>
      <Button
        className={cssCopyrightInfoButton}
        title='Copyright Info'
        onClick={toogleShowInfo}
        ghost={true}
      >
        <Icon iconName='copyright' />
      </Button>
      {isShowInfo && (
        <Tooltip
          title={id}
        >
          <>
            <p>
              Original Owner
              <LinkNewTab
                link={`${KLAYTN_SCOPE}transactions?account=${originalOwner}`}
                title={originalOwner}
              />
            </p>
            <p>
              Current Owner
              <LinkNewTab
                link={`${KLAYTN_SCOPE}transactions?account=${currentOwner}`}
                title={currentOwner}
              />
            </p>
          </>
        </Tooltip>
      )}
    </div>
  )
}

const cssCopyrightInfoButton = css`
  border: 0;
  padding: 0;
  font-size: 1.5rem;
`