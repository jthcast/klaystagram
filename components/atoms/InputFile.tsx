import { css, cx } from '@emotion/css'
import { InputHTMLAttributes } from 'react'
import globalCss from '../../styles/global-css'

interface IInputFile extends InputHTMLAttributes<HTMLElement> {
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
  value,
}: IInputFile) {
  return (
    <label className={cx({ [cssLabel]: true }, { [className]: !!className })}>
      <span className={cssLabelSpan}>{label}</span>
      <input
        className={cssInput}
        accept={accept}
        required={isRequire}
        type="file"
        value={value}
        onChange={onChange}
      />
      <p
        className={cx(
          { [cssFileName]: true },
          { [cssFileAttached]: !!fileName }
        )}
      >
        {fileName || `No photo`}
      </p>
    </label>
  )
}

const cssLabel = css`
  position: relative;
  border: 1px solid ${globalCss.color.borderColor};
  border-radius: 0.25rem;
  cursor: pointer;
`

const cssLabelSpan = css`
  position: absolute;
  font-size: 0.8rem;
  margin: 0.8rem 1.1rem;
  pointer-events: none;
`

const cssInput = css`
  display: none;
`

const cssFileName = css`
  background-color: transparent;
  color: ${globalCss.color.borderColor};
  width: 100%;
  padding: 2.4rem 1rem 0.8rem 1rem;
  font-size: 1rem;
`

const cssFileAttached = css`
  color: ${globalCss.color.color};
`
