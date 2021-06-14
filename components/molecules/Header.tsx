import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import { logout } from '../../redux/modules/auth'
import ui from '../../utils/ui'
import Auth from '../organisms/Auth'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import WalletInfo from './WalletInfo'

export default function Header() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  function walletModalHandling(){
    ui.showModal({
      isOpen: true,
      content: <WalletInfo />
    })
  }

  function authHandling(){
    if(isLoggedIn){
      dispatch(logout())
      return
    }
    ui.showModal({
      isOpen: true,
      content: <Auth />
    })
  }

  return (
    <header>
      <div>
        <h1>
          <img src='/logo-klaystagram.png' alt='Klaystagram' />
        </h1>
      </div>
      <ul>
        {isLoggedIn && (
          <li>
            <Button
              onClick={walletModalHandling}
            >
              <>
                <Icon iconName='search' />
                Wallet
              </>
            </Button>
          </li>
        )}
        <li>
          <Button
            onClick={authHandling}
            title={isLoggedIn ? `Logout` : `Login`}
          >
            <>
              <Icon iconName='search' />
              {isLoggedIn ? `Logout` : `Login`}
            </>
          </Button>
        </li>
      </ul>
    </header>
  )
}
