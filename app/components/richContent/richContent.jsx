import React from 'react';
import { ScrollView } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

const RichContent = ({ html = '', styles = {} }) => {
    const { width } = useWindowDimensions();

    return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
            <RenderHTML
                contentWidth={width}
                source={{ html }}
                tagsStyles={styles}
            />
        </ScrollView>
    );
};

export default RichContent;