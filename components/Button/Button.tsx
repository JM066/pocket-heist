import styles from './Button.module.css'

type ButtonProps = React.ComponentProps<'button'>

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  )
}
