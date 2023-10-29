import {auth, createUserDocumentFromAuth, signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils'
import {useEffect} from 'react'
import {getRedirectResult} from 'firebase/auth'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {
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

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google
      </button>
      <SignUpForm/>
    </div>
  )
}

export default SignIn