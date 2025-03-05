import {useQuery} from "@apollo/client";
import {GET_CMS_BLOCK} from "../header/header.gql";

export const CHECKOUT_STEP = {
    WELCOME: {id:1, title: 'עמוד תשלום'},
    SENDING: {id: 2, title: 'בחירת שיטת משלוח'},
    PAYMENT: {id: 3, title: null}
};

const useCheckout = () => {

    const {data, loading, error} = useQuery(
        GET_CMS_BLOCK,
        {
            fetchPolicy: "cache-and-network",
            variables:
                {identifiers: ["checkout_top_block"]}
        }
    );

    const cmsBlockData = data?.cmsBlocks?.items || [];

    return {
        cmsBlockData
    }
}

export default useCheckout;