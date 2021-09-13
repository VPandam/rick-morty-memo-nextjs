import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className={styles.homeImageContainer}>
            <div className={styles.image} alt="" />
            <div className={styles.linkContainer}>
                <Link href={{pathname: '/game'}} > 
                  Play!
                </Link>
            </div>
        </div>

      <style jsx>{`
          button{
            width: 200px;
            height: 60px;
            font-size: 2rem; 

            position: absolute;
          }
        `}
      </style>

    </>
  )
}
