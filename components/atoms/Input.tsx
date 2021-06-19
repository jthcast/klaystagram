import { css, cx } from '@emotion/css'
import { InputHTMLAttributes } from 'react'
import globalCss from '../../styles/global-css'

interface IInput extends InputHTMLAttributes<HTMLElement> {
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
  value,
}: IInput) {
  const onEnterHandling = (event) => {
    if (onEnter && event.key === `Enter`) {
      onEnter(event)
    }
  }

  return (
    <label
      className={cx(
        { [cssLabel]: true },
        { [cssLabelDisabled]: isDisabled },
        { [className]: !!className }
      )}
    >
      <span className={cssLabelSpan}>{label}</span>
      <input
        className={cx({ [cssInput]: true }, { [cssLabelText]: !!label })}
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

const cssLabel = css`
  position: relative;

  &:focus-within {
    color: ${globalCss.color.primaryBrandColor};
  }
`

const cssLabelDisabled = css`
  opacity: 0.5;
  color: ${globalCss.color.colorDown};
`

const cssLabelText = css`
  padding: 2.4rem 1rem 0.8rem 1rem;
`

const cssLabelSpan = css`
  position: absolute;
  font-size: 0.8rem;
  margin: 0.8rem 1.1rem;
  pointer-events: none;
`

const cssInput = css`
  background-color: transparent;
  color: ${globalCss.color.color};
  border: 1px solid ${globalCss.color.borderColor};
  border-radius: 0.25rem;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline-color: ${globalCss.color.primaryBrandColor};
  }

  &::placeholder {
    color: ${globalCss.color.borderColor};
  }
`
