import { useState } from 'react';
import styles from '../components/ui/FormContainer.module.css';
import buttonStyles from '../components/ui/EditButton.module.css';
import Login from '../components/Login';
import Register from '../components/Register';

function AuthPage() {
  const [isAccount, setIsAccount] = useState(true)

  return (
    <div className={styles.container}> 

      {
        isAccount ? <Login /> : <Register />
      }
      <button onClick={() => setIsAccount(!isAccount)} className={buttonStyles.edit}>
        {isAccount ? 'Create new account' : 'Go to login'}
      </button>
    </div>
  )
}

export default AuthPage;