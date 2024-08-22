import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const CheckMark = ({width = 35, height = 35, ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Circle cx={12} cy={12} r={8} fill="#0f0" fillOpacity={0.8} />
    <Path
      stroke="#222"
      strokeWidth={1.2}
      d="m9.5 12 1.894 1.894a.15.15 0 0 0 .212 0L15.5 10"
    />
  </Svg>
)
export default CheckMark
