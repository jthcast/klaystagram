import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { isValidPrivateKey } from '../../utils/crypto'
import { login } from '../../redux/modules/auth'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { css } from '@emotion/css'
import globalCss from '../../styles/global-css'
import ui from '../../utils/ui'

export default function LoginForm() {
  const dispatch = useDispatch()
  const [privateKey, setPrivateKey] = useState(``)
  const [warningMessage, setWarningMessage] = useState(``)

  function onChangeHandling(event: React.ChangeEvent<HTMLInputElement>) {
    setPrivateKey(event.target.value)
  }

  function loginHandling(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isValidPrivateKey(privateKey)) {
      dispatch(login(privateKey))
      ui.hideModal()
    } else {
      setWarningMessage(`* Invalid Private Key`)
    }
  }

  return (
    <form className={cssForm} onSubmit={loginHandling}>
      <Input
        isRequire
        type="password"
        label="Login with Private Key"
        placeholder="0x2c4078447..."
        onChange={onChangeHandling}
      />
      <Button className={cssButton} title="Login" type="submit">
        Log in
      </Button>
      {warningMessage && <p className={cssWarningMessage}>{warningMessage}</p>}
    </form>
  )
}

const cssForm = css`
  width: 100%;
  display: grid;
  gap: 1rem;
`

const cssButton = css`
  font-weight: bold;
  padding: 0.5rem 0;
`

const cssWarningMessage = css`
  font-size: 0.9rem;
  color: ${globalCss.color.danger};
`
