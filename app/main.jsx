import {ScrollView} from "react-native";
import {Redirect, Slot} from "expo-router";

const Main = props => {
    return (
        <ScrollView>
            <Redirect href="/homepage" />
            <Slot />
        </ScrollView>
    )
}

export default Main;