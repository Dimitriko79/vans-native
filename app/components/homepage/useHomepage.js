import {useQuery} from "@apollo/client";
import {GET_HOMEPAGE} from "./homepage.gql";
import {router} from "expo-router";

const useHomepage = () => {

    const {data, loading, error} = useQuery(GET_HOMEPAGE, {
        fetchPolicy: 'cache-and-network',
    })

    const handlePress = id => {
        return  router.push({ pathname: "/category", params: { ids: id } })
    }

    const homepageData = data || null;

    return {
        loading,
        error,
        homepageData,
        handlePress
    }
}

export default useHomepage;