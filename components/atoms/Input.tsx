import { cx } from '@emotion/css'
import { InputHTMLAttributes } from 'react'

interface IInput extends InputHTMLAttributes<HTMLElement>{
  autoFocus?: boolean
  className?: string
  isDisabled?: boolean
  label?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onEnter?: (event: React.KeyboardEvent<HTMLElement>) => void
  placeholder?: string
  isReadOnly?: boolean
  isRequire?: boolean
  type?: `text` | `password`
  value?: string
}

export default function Input({
  autoFocus,
  className,
  isDisabled = false,
  label = ``,
  onChange,
  onClick,
  onEnter,
  placeholder,
  isReadOnly = false,
  isRequire = false,
  type = `text`,
  value
}: IInput) {
  const onEnterHandling = (event) => {
    if(onEnter && event.key === `Enter`){
      onEnter(event)
    }
  }

  return (
    <label className={cx(
      // { [cssButton]: true },
      { [className]: className ? true : false }
    )}>
      {label}
      <input
        autoFocus={autoFocus}
        disabled={isDisabled}
        placeholder={placeholder}
        readOnly={isReadOnly}
        required={isRequire}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onKeyUp={onEnterHandling}
      />
    </label>
  )
}
