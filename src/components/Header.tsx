import logo from '../assets/Logo.svg'
import styles from './header.module.css'
export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo to-do" />
    </header>
  )
}