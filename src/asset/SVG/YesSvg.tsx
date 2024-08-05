import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const YesSvg = ({width = 25, height = 25, ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 12.611 8.923 17.5 20 6.5"
    />
  </Svg>
)
export default YesSvg
