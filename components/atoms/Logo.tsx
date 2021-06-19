import { css, cx } from '@emotion/css'
import Icon from './Icon'

interface ILogo {
  className?: string
}

export default function Logo({ className }: ILogo) {
  return (
    <div className={cx({ [cssLogo]: true }, { [className]: !!className })}>
      <h1>Klaystagram</h1>
    </div>
  )
}

const cssLogo = css`
  display: flex;
  align-items: center;

  h1 {
    font-size: 1.25rem;
  }
`
