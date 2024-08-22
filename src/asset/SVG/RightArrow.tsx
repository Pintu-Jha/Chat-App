import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const RightArrow = ({width = 25, height = 25, ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      fill="#000"
      fillRule="evenodd"
      d="M12.293 4.293a1 1 0 0 1 1.414 0l7 7a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414-1.414L17.586 13H4a1 1 0 1 1 0-2h13.586l-5.293-5.293a1 1 0 0 1 0-1.414Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default RightArrow
