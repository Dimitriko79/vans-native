import { ScrollView } from "react-native";
import Signin from "./components/signin/signin";
import useAccount, {ACCOUNT_VIEW} from "./components/account/useAccount";
import CreateAccount from "./components/createAccount/createAccount";
import PersonalArea from "./components/personalArea/PersonalArea";

const Account = () => {

    const {
        view,
        setView
    } = useAccount();

    let content;

    if (ACCOUNT_VIEW[view] === 1 ) {
        content = <Signin handleView={setView}/>;
    } else if (ACCOUNT_VIEW[view] === 2 ) {
        content = <CreateAccount view={view} handleView={setView}/>;
    } else {
        content = <PersonalArea />;
    }

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            {content}
        </ScrollView>
    );
};

export default Account;
