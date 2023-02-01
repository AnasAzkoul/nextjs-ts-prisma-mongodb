import React from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useSession } from 'next-auth/react';

type Props = {};

const Navbar = (props: Props) => {
  const session = useSession(); 
  
  return (
    <header className={styles.header}>
      <div className='container'>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <Link href='/'>Tech Blog</Link>
          </div>
          <nav>
            <ul className={styles.navLinks}>
              <li className={styles.link}>
                <Link href='/posts'>Posts</Link>
              </li>
              <li className={styles.link}>
                <Link href='/contact'>Contact</Link>
              </li>
              <li className={styles.link}>
                <Link href='/auth/signin'>{session.status === 'unauthenticated' ? `Log in / Sign up` : `Log out`}</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
