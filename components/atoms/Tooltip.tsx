import { cx } from '@emotion/css'

interface ITooltip {
  children?: string | React.ReactElement
  className?: string
  title?: string
}

export default function Tooltip({
  children,
  className,
  title,
}: ITooltip) {

  return (
    <div
      className={cx(
        // { [cssButton]: true },
        { [className]: className ? true : false }
      )}
    >
      <div>
        {title}
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
