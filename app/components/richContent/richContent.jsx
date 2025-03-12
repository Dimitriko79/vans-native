import React, { useMemo } from "react";
import { useWindowDimensions, View} from "react-native";
import RenderHTML from "react-native-render-html";

const RichContent = ({ html = "", customStyles = {} }) => {
    const { width } = useWindowDimensions();

    const source = useMemo(() => ({ html }), [html]);

    if (!html) return null;

    return (
        <View>
            <RenderHTML contentWidth={width} source={source} tagsStyles={customStyles} />
        </View>
    );
};

const styles = {
    scrollContainer: {
        paddingHorizontal: 16,
    },
};

export default RichContent;
