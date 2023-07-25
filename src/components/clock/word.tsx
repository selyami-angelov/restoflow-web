interface Props {
  value: string
  hidden?: boolean
}
export const Word = ({ value, hidden = false }: Props) => {
  return (
    <div className="digital">
      <p>{value}</p>
      <p style={{ visibility: hidden ? 'hidden' : 'visible' }}>{value}</p>
    </div>
  )
}
