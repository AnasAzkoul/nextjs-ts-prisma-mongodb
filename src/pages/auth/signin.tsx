import React, {FormEvent, useRef} from 'react'; 
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import styles from './signin.module.css'; 

type Props = {}

const SignIn = (props: Props) => {
  const emailRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const router = useRouter(); 
  
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); 
    
    const res = await signIn('credentials', {
      email: emailRef.current?.value,
      password: passRef.current?.value,
      redirect: false,
    });
    
    if (res?.ok === true) {
      router.push('/')
    }
  }
  
  return (
    <section>
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1 className={styles.form__title}>Sign in</h1>
          <div className={styles.form__control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id='email' ref={emailRef}/>
          </div>
          <div className={styles.form__control}>
            <label htmlFor="password">Your password</label>
            <input type="password" id='password' ref={passRef}/>
          </div>
          <button type='submit' className={styles.btn}>Sign in</button>
        </form>
      </div>
    </section>
  )
}

export default SignIn
