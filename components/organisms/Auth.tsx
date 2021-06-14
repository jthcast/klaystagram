import { useState } from 'react'
import LoginForm from '../molecules/LoginForm'
import SignupForm from '../molecules/SignupForm'

export default function Auth() {
  const [isLoginForm, setLoginForm] = useState(true)

  function toggleForm(){
    setLoginForm(!isLoginForm)
  }

  return (
    <div>
      <h2>
        Klaytn-based NFT<br />
        photo licensing application
      </h2>
      <h1>
        <img src='./logo-klaystagram.png' alt='Klaystagram' />
      </h1>
      {isLoginForm ? <LoginForm /> : <SignupForm />}
      <p>
        {isLoginForm ? `Don't have an account?` : `Have an account?`}
        <span onClick={toggleForm}>
          {isLoginForm ? `Sign up` : `Login`}
        </span>
      </p>
    </div>
  )
}
