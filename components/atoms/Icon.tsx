import { css, cx, keyframes } from '@emotion/css'
import React, { CSSProperties, SVGAttributes } from 'react'

export interface IconProps extends SVGAttributes<SVGElement> {
  className?: string
  style?: CSSProperties
  spin?: boolean
  rotate?: number
  onClick?: () => void
}

interface IconContentProps {
  className?: string
  style?: CSSProperties
  spin?: boolean
  rotate?: number
  onClick?: () => void
  iconName: string
}

interface IconDetailProps {
  [name: string]: {
    viewBox: string
    paths: { 
      fill?: string
      d: string
    }[]
  }
}

const icons: IconDetailProps = {
  spinner: {
    viewBox: `0 0 1024 1024`,
    paths: [
      {
        d: `M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z`
      }
    ]
  },
  klaytnLogo: {
    viewBox: `0 0 40.1 39.6`,
    paths: [
      {
        d: `M21 19.7l13.7 13.6a19.826 19.826 0 000-27.2z`
      },
      {
        d: `M20 20.6L6.5 34 20 39.6 33.5 34z`
      },
      {
        d: `M19.5 19.2l14-13.9L20.6 0 7.8 30.9z`
      },
      {
        d: `M0 19.7a19.731 19.731 0 005.4 13.6L18.8 1z`
      }
    ]
  },
  wallet: {
    viewBox: `0 0 64 64`,
    paths: [
      {
        d: `M42.667 32H48v10.667h-5.333V32z`
      },
      {
        d: `M53.333 18.667v-5.334A5.339 5.339 0 0048 8H13.333c-4.41 0-8 3.59-8 8v32c0 5.87 4.784 8 8 8h40a5.339 5.339 0 005.334-5.333V24a5.339 5.339 0 00-5.334-5.333zm-40-5.334H48v5.334H13.333a2.669 2.669 0 010-5.334zm40 37.334H13.365c-1.232-.032-2.698-.52-2.698-2.667V23.507c.837.301 1.725.493 2.666.493h40v26.667z`
      }
    ]
  },
  upload: {
    viewBox: `0 0 62 57`,
    paths: [
      {
        d: `M56 14h-8.453l-4.88-5.334h-16V14H40.32l4.88 5.333H56v32H13.333v-24H8v24c0 2.934 2.4 5.334 5.333 5.334H56c2.933 0 5.333-2.4 5.333-5.334v-32C61.333 16.4 58.933 14 56 14zM21.333 35.333c0 7.36 5.974 13.334 13.334 13.334 7.36 0 13.333-5.974 13.333-13.334C48 27.973 42.027 22 34.667 22s-13.334 5.973-13.334 13.333zm13.334-8c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zM13.333 14h8V8.666h-8v-8H8v8H0V14h8v8h5.333v-8z`,
      }
    ]
  },
  copyright: {
    viewBox: `0 0 64 64`,
    paths: [
      {
        d: `M32 1C14.88 1 1 14.88 1 32c0 17.12 13.88 31 31 31 17.12 0 31-13.88 31-31C63 14.88 49.12 1 32 1zm0 56C18.183 57 7 45.819 7 32 7 18.184 18.181 7 32 7c13.816 0 25 11.181 25 25 0 13.816-11.181 25-25 25zm13.419-12.633c-1.202 1.214-5.691 5.175-13.008 5.175-10.304 0-17.56-7.679-17.56-17.696 0-9.894 7.534-17.425 17.47-17.425 6.94 0 11.092 3.327 12.199 4.347a1.496 1.496 0 01.242 1.915l-2.27 3.514a1.5 1.5 0 01-2.187.365c-1.075-.847-3.977-2.817-7.714-2.817-6.038 0-9.74 4.416-9.74 10.01 0 5.199 3.362 10.462 9.785 10.462 4.083 0 7.106-2.38 8.216-3.403a1.5 1.5 0 012.228.217l2.483 3.396a1.494 1.494 0 01-.144 1.94z`,
      }
    ]
  },
  exchange: {
    viewBox: '0 0 64 64',
    paths: [
      {
        d: 'M57.893 24.773L47.227 14.107a2.677 2.677 0 00-3.787 3.786L49.573 24H18.667a2.667 2.667 0 000 5.333H56a2.668 2.668 0 002.453-1.653 2.667 2.667 0 00-.56-2.907zm-12.56 9.893H8a2.666 2.666 0 00-2.453 1.654 2.667 2.667 0 00.56 2.907l10.666 10.666a2.668 2.668 0 003.787 0 2.668 2.668 0 000-3.787L14.427 40h30.906a2.666 2.666 0 100-5.334z',
      }
    ]
  },
  times: {
    viewBox: '0 0 352 512',
    paths: [
      {
        d: 'M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z',
      }
    ]
  }
}

function getRotateDegree(viewBox: string){
  const viewBoxArray = viewBox.split(' ')

  return `${+viewBoxArray[2] / 2} ${+viewBoxArray[3] / 2}`
}

export default function Icon({
  className,
  style,
  spin,
  rotate,
  onClick,
  iconName,
}: IconContentProps){
  const { viewBox, paths } = icons[iconName]

  return (
    <svg
      viewBox={viewBox}
      focusable="false"
      className={cx(
        { [cssIcon]: true },
        { [cssSpin]: spin },
        { [className]: className !== '' },
      )}
      style={style}
      width="1em"
      height="1em"
      fill="currentColor"
      aria-hidden="true"
      onClick={onClick}
    >
      {paths.map((path, index) => {
        const { fill, d } = path

        return(
          <path
            key={`${d}${index}`}
            transform={
              rotate
                ? `rotate(${rotate} ${getRotateDegree(viewBox)})`
                : undefined
            }
            fill={fill}
            d={d}
          />
        )
      })}
    </svg>
  )
}

const keyFrameSpin = keyframes`
  100% {
    transform: rotate(360deg)
  }
`

const cssSpin = css`
  animation: ${keyFrameSpin} 1s infinite linear
`

const cssIcon = css`
  color: inherit 
`