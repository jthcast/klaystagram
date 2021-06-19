import { css, cx } from '@emotion/css'
import { TextareaHTMLAttributes } from 'react'
import globalCss from '../../styles/global-css'

interface ITextarea extends TextareaHTMLAttributes<HTMLElement> {
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
  value,
}: ITextarea) {
  return (
    <label className={cx({ [cssLabel]: true }, { [className]: !!className })}>
      <span className={cssLabelSpan}>{label}</span>
      <textarea
        className={cx({ [cssTextarea]: true }, { [cssLabelText]: !!label })}
        autoComplete="off"
        required={isRequire}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </label>
  )
}

const cssLabel = css`
  position: relative;
  border: 1px solid ${globalCss.color.borderColor};
  border-radius: 0.25rem;

  &:focus-within {
    outline: auto;
    color: ${globalCss.color.primaryBrandColor};
  }
`

const cssLabelText = css`
  margin-top: 2.4rem;
`

const cssLabelSpan = css`
  position: absolute;
  font-size: 0.8rem;
  margin: 0.8rem 1.1rem;
  pointer-events: none;
`

const cssTextarea = css`
  background-color: transparent;
  color: ${globalCss.color.color};
  border: 0;
  width: 100%;
  padding: 0 1.1rem 0.8rem 1.1rem;
  font-size: 1rem;
  resize: none;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${globalCss.color.borderColor};
  }
`
