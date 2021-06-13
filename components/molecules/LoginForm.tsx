import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { isValidPrivateKey } from '../../utils/crypto'
import { login } from '../../redux/modules/auth'
import Input from '../atoms/Input'
import Button from '../atoms/Button'
import { useRouter } from 'next/dist/client/router'

export default function LoginForm() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [privateKey, setPrivateKey] = useState(``)
  const [warningMessage, setWarningMessage] = useState(``)

  function onChangeHandling(event: React.ChangeEvent<HTMLInputElement>){
    setPrivateKey(event.target.value)
  }

  function loginHandling(){
    if(isValidPrivateKey(privateKey)){
      dispatch(login(privateKey))
      router.push(`/Feeds`);
    }else{
      setWarningMessage(`* Invalid Private Key`)
    }
  }

  return (
    <div>
      <Input 
        // className=''
        type='password'
        label='Login with Private Key'
        placeholder='0x2c4078447...'
        onChange={onChangeHandling}
      />
      <Button
        // className=''
        title='Login'
        onClick={loginHandling}
      >
        Log in
      </Button>
      {warningMessage && 
        <p>
          {warningMessage}
        </p>
      }
    </div>
  )
}
