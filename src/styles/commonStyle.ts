
import { StyleSheet } from "react-native";
import { spacing } from "./spacing";

export const APP_PADDING_HORIZONTAL = spacing.PADDING_12

const commonStyle = StyleSheet.create({
    flexRow: {
        flexDirection: "row",
    },
    arrowImageSize: {
        width: spacing.WIDTH_12,
        height: spacing.WIDTH_12,
    },
    justifyALignCenter: {
        justifyContent: "center",
        alignItems: "center",
    },
})

export default commonStyle