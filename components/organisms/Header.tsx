import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/modules'
import { logout } from '../../redux/modules/auth'
import ui from '../../utils/ui'
import KlaytnContainer from '../molecules/KlaytnContainer'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import WalletInfo from '../molecules/WalletInfo'
import { css } from '@emotion/css'
import globalCss from '../../styles/global-css'
import LoginForm from '../molecules/LoginForm'
import SignupForm from '../molecules/SignupForm'
import UploadPhotoForm from '../molecules/UploadPhotoForm'
import Logo from '../atoms/Logo'

export default function Header() {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  function showLoginModal(){
    ui.showModal({
      content: (
        <KlaytnContainer>
          <LoginForm />
        </KlaytnContainer>
      )
    })
  }

  function showSignupModal(){
    ui.showModal({
      content: (
        <KlaytnContainer>
          <SignupForm />
        </KlaytnContainer>
      )
    })
  }

  function showWalletModal(){
    ui.showModal({
      content: (
        <KlaytnContainer>
          <WalletInfo />
        </KlaytnContainer>
      )
    })
  }

  function showUploadModal(){
    ui.showModal({
      content: (
        <KlaytnContainer>
          <UploadPhotoForm />
        </KlaytnContainer>
      )
    })
  }

  function logoutHandling(){
    if(isLoggedIn){
      dispatch(logout())
      return
    }
  }

  return (
    <header className={cssHeader}>
      <div className={cssContainer}>
        <div className={cssLogo}>
          <Logo />
        </div>
        <nav className={cssMenus}>
          <ul>
            {!isLoggedIn && (
              <>
                <li>
                  <Button
                    onClick={showLoginModal}
                    title='Login'
                  >
                    Login
                  </Button>
                </li>
                <li>
                  <Button
                    className={cssSecondaryButton}
                    onClick={showSignupModal}
                    ghost={true}
                    title='Sign Up'
                  >
                    Sign Up
                  </Button>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Button
                    className={cssGhostButton}
                    ghost={true}
                    onClick={showWalletModal}
                    title='Wallet'
                  >
                    <Icon iconName='wallet' />
                  </Button>
                </li>
                <li>
                  <Button
                    className={cssGhostButton}
                    ghost={true}
                    onClick={showUploadModal}
                    title='Upload photo'
                  >
                    <Icon iconName='upload' />
                  </Button>
                </li>
                <li>
                  <Button
                    className={cssGhostButton}
                    ghost={true}
                    onClick={logoutHandling}
                    title='Logout'
                  >
                    <Icon iconName='logout' />
                  </Button>
                </li>
              </>
            )}
            
          </ul>
        </nav>
      </div>
    </header>
  )
}

const cssHeader = css`
  position: sticky;
  top: 0;
  width: 100%;
  background-color: ${globalCss.color.white};
  border-bottom: 1px solid ${globalCss.color.borderColor};
`
  
const cssContainer = css`
  display: flex;
  max-width: ${globalCss.common.maxWidth};
  margin: auto;
  padding: 0.5rem 1.5rem;
  
  @media ${globalCss.breakpoint.tabletQuery} {
    padding: 1.5rem 2rem;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 1rem 1.25rem;
  }
`

const cssLogo = css`
  margin-right: auto;
`

const cssMenus = css`
  display: flex;
  align-items: center;

  ul {
    display: flex;
    list-style: none;

    li button{
      font-weight: bold;
    }

    li:not(:last-child){
      margin: 0 1rem 0 0;
    }
  }
`

const cssSecondaryButton = css`
  border: 0;
  padding: 0.25rem 0;
  color: ${globalCss.color.secondaryBrandColor};
`

const cssGhostButton = css`
  font-size: 1.5rem;
`