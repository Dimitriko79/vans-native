import {View, Text, ScrollView} from "react-native";
import {useState} from "react";
import Signin from "./components/signin/signin";

const Account = props => {
    const [isUserSignIn, setUserSignIn] = useState(true);

    let content;

    if(isUserSignIn){
        content = (
            <Signin/>
        )
    } else (
        content = (
            <View>
                <Text>Sign Out</Text>
            </View>
        )
    )
    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            {content}
        </ScrollView>
    )
}

export default Account