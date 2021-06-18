import { css, cx } from '@emotion/css'
import Icon from './Icon'

interface ILogo {
  className?: string
}

export default function Logo({ className }: ILogo) {
  return (
    <div className={cx({ [cssLogo]: true }, { [className]: !!className })}>
      <Icon iconName="klaytnLogo" />
      <h1>Klaystagram</h1>
    </div>
  )
}

const cssLogo = css`
  display: flex;
  align-items: center;

  svg {
    font-size: 1.4em;
    margin: 0.2rem 0.25rem 0 0;
  }

  h1 {
    font-size: 1.25rem;
  }
`
