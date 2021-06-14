import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { KLAY_FAUCET } from '../../constants/url'
import caver from '../../klaytn/caver'
import { RootState } from '../../redux/modules'
import Input from '../atoms/Input'
import LinkNewTab from '../atoms/LinkNewTab'

export default function WalletInfo() {
  const address = useSelector((state: RootState) => state.auth.address);
  const [balance, setBalance] = useState(0)

  async function getBalance(){
    if(!address){
      return
    }

    const peb = await caver.klay.getBalance(address)
    const balance = caver.utils.fromPeb(peb, `KLAY`)
    setBalance(balance)
  }

  useEffect(() => {
    getBalance()
  }, [])

  return (
    <div>
      <Input
        isReadOnly
        label='Wallet Address'
        value={address || ``}
      />
      <Input
        isReadOnly
        label='Balance'
        value={`${balance} KLAY`}
      />
      <p>
        If you need small amount of Klay for testing.
        <LinkNewTab
          link={KLAY_FAUCET}
          title='Run Klay Faucet'
        />
      </p>
    </div>
  )
}
