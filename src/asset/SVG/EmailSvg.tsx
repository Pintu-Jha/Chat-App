import * as React from 'react';
import Svg, {SvgProps, Path, Rect} from 'react-native-svg';
const EmailSvg = ({width = 20, height = 20, ...props}: SvgProps) => (
  <Svg width={width} height={height} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m4 7 6.2 4.65a3 3 0 0 0 3.6 0L20 7"
    />
    <Rect
      width={18}
      height={14}
      x={3}
      y={5}
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={2}
      rx={2}
    />
  </Svg>
);
export default EmailSvg;
