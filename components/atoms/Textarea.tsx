import { cx } from '@emotion/css'
import { TextareaHTMLAttributes } from 'react'

interface ITextarea extends TextareaHTMLAttributes<HTMLElement>{
  className?: string
  isRequire?: boolean
  label?: string
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  value?: string
}

export default function Textarea({
  className,
  isRequire = false,
  label = ``,
  onChange,
  placeholder,
  value
}: ITextarea) {
  
  return (
    <label className={cx(
      // { [cssButton]: true },
      { [className]: className ? true : false }
    )}>
      {label}
      <textarea
        autoComplete='off'
        required={isRequire}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </label>
  )
}
