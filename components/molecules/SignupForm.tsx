import { useState } from 'react'
import caver from '../../klaytn/caver'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { css } from '@emotion/css'

export default function SignupForm() {
  const [privateKey, setPrivateKey] = useState(``)

  function generatePrivateKey(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const { privateKey } = caver.klay.accounts.create()
    setPrivateKey(privateKey)
  }

  return (
    <form className={cssContainer} onSubmit={generatePrivateKey}>
      <Input
        label="Private Key"
        placeholder="Generate Private Key to Sign up"
        value={privateKey || ''}
        isReadOnly
      />
      <Button className={cssButton} title="Generate Private Key" type="submit">
        Generate Private Key
      </Button>
    </form>
  )
}

const cssContainer = css`
  width: 100%;
  display: grid;
  gap: 1rem;
`

const cssButton = css`
  font-weight: bold;
  padding: 0.5rem 0;
`
