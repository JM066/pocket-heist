import styles from './Input.module.css'

interface InputProps extends React.ComponentProps<'input'> {
  label: string
  id: string
}

export default function Input({ label, id, ...props }: InputProps) {
  return (
    <div className={styles.field}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  )
}
