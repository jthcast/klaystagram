import { cx } from '@emotion/css'
import { InputHTMLAttributes } from 'react'

interface IInputFile extends InputHTMLAttributes<HTMLElement>{
  accept?: string
  className?: string
  fileName?: string
  isRequire?: boolean
  label?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  value?: string
}

export default function InputFile({
  accept,
  className,
  fileName,
  isRequire = false,
  label = ``,
  onChange,
  value
}: IInputFile) {

  return (
    <label className={cx(
      // { [cssButton]: true },
      { [className]: className ? true : false }
    )}>
      {label}
      <input
        accept={accept}
        required={isRequire}
        type='file'
        value={value}
        onChange={onChange}
      />
      <p>
        {fileName || `No photo`}
      </p>
      <span>Search</span>
    </label>
  )
}
