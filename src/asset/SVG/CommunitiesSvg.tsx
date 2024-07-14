import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
const CommunitiesSvg = ({width = 25, height = 25, ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Circle
      cx={12}
      cy={8}
      r={3}
      stroke="#33363F"
      strokeLinecap="round"
      strokeWidth={2}
    />
    <Path
      stroke="#33363F"
      strokeWidth={2}
      d="M15.268 8a2 2 0 1 1 3.464 2 2 2 0 0 1-3.464-2ZM5.268 8a2 2 0 1 1 3.464 2 2 2 0 0 1-3.464-2Z"
    />
    <Path
      fill="#33363F"
      d="m16.882 18-.98.197.16.803h.82v-1Zm3.838-1.096.943-.334-.943.334Zm-5.94-2.194-.604-.796-1.157.879 1.234.767.528-.85ZM19.868 17h-2.985v2h2.985v-2Zm-.09.238a.21.21 0 0 1-.005-.103.218.218 0 0 1 .043-.097c.032-.04.059-.038.052-.038v2c1.146 0 2.274-1.08 1.796-2.43l-1.885.668ZM17 15c1.642 0 2.403 1.181 2.778 2.238l1.885-.668C21.198 15.259 19.948 13 17 13v2Zm-1.614.507C15.77 15.215 16.282 15 17 15v-2c-1.162 0-2.097.362-2.824.914l1.21 1.593Zm-1.133.053c1.039.646 1.474 1.772 1.648 2.637l1.96-.394c-.217-1.083-.824-2.867-2.552-3.942l-1.056 1.699ZM9.22 14.71l.527.85 1.234-.767-1.157-.879-.605.796Zm-5.94 2.194.942.334-.942-.334ZM7.118 18v1h.819l.162-.803-.98-.197ZM7 15c.718 0 1.23.215 1.614.507l1.21-1.593C9.097 13.362 8.162 13 7 13v2Zm-2.778 2.238C4.597 16.181 5.358 15 7 15v-2c-2.949 0-4.198 2.259-4.663 3.57l1.885.668ZM4.132 17c-.006 0 .02-.002.053.038a.218.218 0 0 1 .042.097.21.21 0 0 1-.005.103l-1.885-.668C1.86 17.92 2.987 19 4.133 19v-2Zm2.986 0H4.133v2h2.985v-2Zm.98 1.197c.175-.865.61-1.991 1.65-2.637L8.69 13.86c-1.728 1.075-2.335 2.86-2.553 3.942l1.96.394Z"
    />
    <Path
      stroke="#33363F"
      strokeLinecap="round"
      strokeWidth={2}
      d="M12 14c3.572 0 4.592 2.551 4.883 4.009.109.541-.33.991-.883.991H8c-.552 0-.992-.45-.883-.991C7.408 16.55 8.428 14 12 14Z"
    />
  </Svg>
)
export default CommunitiesSvg