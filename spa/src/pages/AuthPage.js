import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function AuthPage() {
  const [isAccount, setIsAccount] = useState(true)

  return (
    <>

      {
        isAccount ? <Login /> : <Register />
      }
      <button onClick={() => setIsAccount(!isAccount)}>
        {isAccount ? 'Create new account' : 'Go to login'}
      </button>
    </>
  )
}

export default AuthPage;