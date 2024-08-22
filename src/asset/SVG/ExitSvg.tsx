import * as React from "react"
import Svg, { SvgProps, G, Path } from "react-native-svg"
const ExitSvg = ({width = 40, height = 40, ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      stroke="red"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <Path d="M14 7.636V4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v15a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-3.136M10 12h11m0 0-3-3.5m3 3.5-3 3.5" />
    </G>
  </Svg>
)
export default ExitSvg
