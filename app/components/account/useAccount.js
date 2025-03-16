import useUserContext from "../../context/user/userProvider";

export const ACCOUNT_VIEW = {
    SIGNIN: 1,
    CREATE: 2,
     ACCOUNT: 3
}

const useAccount = () => {
    const {view, setView} = useUserContext();

    return {
        view,
        setView
    }
}

export default useAccount;