import React, { useRef } from 'react';
import { validateFormInputs } from '@/Utils/validation';
import type { FormTypes } from '@/Utils/validation';
import styles from './contactForm.module.css';

type Props = {};

const ContactForm = (props: Props) => {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData: FormTypes = {
      email: emailRef.current?.value!,
      name: nameRef.current?.value!,
      text: messageRef.current?.value!,
    };
    

    const result = validateFormInputs(formData); 

    if (result.success) {
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data);
    }

    if (!result.success) {
      console.log(result.error);
    }
  };

  return (
    <section className={styles.contact}>
      <h1>How can I help you</h1>
      <form
        className={styles.form}
        onSubmit={(e) => onSubmitHandler(e)}
        noValidate
      >
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' ref={emailRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' ref={nameRef} />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea id='message' rows={5} ref={messageRef} />
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
