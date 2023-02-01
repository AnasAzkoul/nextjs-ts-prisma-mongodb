import Link from 'next/link';
import React, {FormEvent, useRef} from 'react';
import { newUserSchema } from '@/Utils/validation';
import type { NewUserTypes } from '@/Utils/validation';
import styles from './signup.module.css';

const SignUp = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (password !== confirmPassword) {
      console.log('passwords arent equal');
      return;
    }

    const newUser = {
      name,
      email,
      password,
    };

    const result = newUserSchema.safeParse(newUser);

    if (!result.success) {
      console.log(result.error);
      return;
    }

    fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <section className={`container ${styles.signup}`}>
      <form className='form' onSubmit={(e) => submitHandler(e)}>
        <h2 className={styles.heading}>Sign up</h2>
        <div className={styles.controls}>
          <div className={styles.form__control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameRef} />
          </div>
          <div className={styles.form__control}>
            <label htmlFor='email'>Your email</label>
            <input type='email' id='email' ref={emailRef} />
          </div>
          <div className={styles.form__control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' ref={passwordRef} />
          </div>
          <div className={styles.form__control}>
            <label htmlFor='password'>Confirm password</label>
            <input type='password' id='password' ref={confirmPasswordRef} />
          </div>
          <div className={styles.btn_container}>
            <button type='submit' className={styles.btn}>Sign up</button>
          </div>
          <div className={styles.signin_link}>
            if you already have an account please <Link href='/auth/signin'>sign in</Link>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
