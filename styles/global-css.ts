const breakPointMobile = `17.5rem`;
const breakPointTablet = `40.875rem`;
const breakPointDesktop = `64rem`;
const fontSize = `16px`;

function getFontPercent() {
  return (parseInt(fontSize) / 16) * 100 + '%';
}

export function rem(size: number) {
  return size / parseInt(fontSize) + 'rem';
}

const globalCss = {
  breakpoint: {
    mobile: breakPointMobile,
    mobileQuery: `(max-width: ${breakPointTablet})`,
    tablet: breakPointTablet,
    tabletQuery: `(min-width: ${breakPointTablet}) and (max-width: ${breakPointDesktop})`,
    desktop: breakPointDesktop,
  },
  common: {
    maxWidth: `60.938rem`,
    maxWidthHeader: `100%`,
    maxWidthImage: `18.313rem`,
    fontBold: `600`,
    fontNormal: `400`,
    borderRadius: `0.5rem`,
    fontSize,
    fontPercent: getFontPercent(),
  },
  color: {
    backgroundColor: `var(--background-base)`,
    backgroundColorDown: `var(--background-down)`,
    backgroundColorOpacity: `var(--background-base-opacity)`,
    backgroundColorDownOpacity: `var(--background-down-opacity)`,
    borderColor: `var(--border-base)`,
    groupColor: `var(--group-base)`,
    groupColorOpacity: `var(--group-base-opacity)`,
    color: `var(--color-base)`,
    colorDown: `var(--color-down)`,
    primaryBrandColor: `var(--primary-brand-base)`,
    secondaryBrandColor: `var(--secondary-brand-base)`,
    secondaryBrandColorOpacity: `var(--secondary-brand-base-opacity)`,
    backgroundCode: `var(--background-code-base)`,
    colorCode: `var(--color-code-base)`,
    black: `var(--black)`,
    white: `var(--white)`,
    danger: `var(--danger)`,
  },
};

export default globalCss;
