import Container from "../components/container";
import styles from '../styles/Container.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <Container title="Illie&apos;s Game Tracker">
      <div className={styles.grid}>
        <Link href="/add"><a className={styles.card}>Add Game</a></Link>
        <Link href="/games"><a className={styles.card}>View Games</a></Link>
      </div>
    </Container>
  )
}
