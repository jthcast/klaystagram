import { css } from '@emotion/css'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { KLAY_FAUCET } from '../../constants/url'
import caver from '../../klaytn/caver'
import { RootState } from '../../redux/modules'
import globalCss from '../../styles/global-css'
import Input from '../atoms/Input'
import LinkNewTab from '../atoms/LinkNewTab'

export default function WalletInfo() {
  const address = useSelector((state: RootState) => state.auth.address)
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    async function getBalance() {
      if (!address) {
        return
      }

      const peb = await caver.klay.getBalance(address)
      const balance = caver.utils.fromPeb(peb, `KLAY`)
      setBalance(balance)
    }

    getBalance()
  }, [address])

  return (
    <div className={cssContainer}>
      <Input isReadOnly label="Wallet Address" value={address || ``} />
      <Input isReadOnly label="Balance" value={`${balance} KLAY`} />
      <p className={cssMessage}>
        If you need small amount of Klay for testing?
        <br />
        <LinkNewTab link={KLAY_FAUCET} title="Run Klay Faucet" />
      </p>
    </div>
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

const cssMessage = css`
  font-size: 0.8rem;
  text-align: center;
`
