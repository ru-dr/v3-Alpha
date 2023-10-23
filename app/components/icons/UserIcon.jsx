import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({width=28, height=28}) => (
  <Svg
    width= {width}
    height= {height}
    viewBox="0 0 30 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M15 14.378C18.4518 14.378 21.25 11.6958 21.25 8.38719C21.25 5.07853 18.4518 2.39633 15 2.39633C11.5482 2.39633 8.75 5.07853 8.75 8.38719C8.75 11.6958 11.5482 14.378 15 14.378Z"
      fill="#0E1219"
    />
    <Path
      d="M14.9999 17.3735C8.73745 17.3735 3.63745 21.3993 3.63745 26.3598C3.63745 26.6952 3.91245 26.9588 4.26245 26.9588H25.7374C26.0874 26.9588 26.3624 26.6952 26.3624 26.3598C26.3624 21.3993 21.2624 17.3735 14.9999 17.3735Z"
      fill="#0E1219"
    />
  </Svg>
)
export { SvgComponent as UserIcon }
