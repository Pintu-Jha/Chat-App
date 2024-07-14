import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
const LeftArrowSvg = ({width = 20, height = 20, ...props}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    data-name="Layer 1"
    viewBox="0 0 512 512"
    {...props}>
    <Path d="M34 256 210 80l21.21 21.2L91.4 241H478v30H91.4l139.85 139.84L210 432Z" />
  </Svg>
);
export default LeftArrowSvg;
