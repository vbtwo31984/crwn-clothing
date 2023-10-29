import { useState } from 'react'
import { auth, signInWithGoogleRedirect, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './sign-in-form.styles.scss'
import { useEffect } from 'react'
import { getRedirectResult } from 'firebase/auth'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  useEffect(() => {
    async function effect() {
      const response = await getRedirectResult(auth)
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user)
        console.log(userDocRef)
      }
    }

    effect()
  }, [])

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(response)
      resetFormFields()
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password')
          break
        case 'auth/user-not-found':
          alert('invalid user')
          break
        default:
          console.log(error)
      }
    }
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />

        <div className='buttons-container'>
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogleRedirect} buttonType='google'>Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm