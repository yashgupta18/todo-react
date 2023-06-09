import React from 'react'
import './button.css'

type btnProps = {
  onClick?: () => void,
  title: string,
  type?: "button" | "submit" | "reset"
}

const Button = ({onClick, title, type}:btnProps) => {
  return (
    <button
      className='lButton'
      onClick={onClick}
      type={type}
    >
      {title}
    </button>
  )
}

export default Button