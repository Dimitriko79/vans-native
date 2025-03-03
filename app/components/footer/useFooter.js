import {useQuery} from "@apollo/client";
import {GET_CMS_BLOCK} from "../header/header.gql";

const useFooter = () => {

    const {data, loading, error} = useQuery(
        GET_CMS_BLOCK,
        {
            fetchPolicy: "cache-and-network",
            variables:
                {identifiers: ["top_footer_links"]}
        }
    );

    const cmsBlockData = data?.cmsBlocks?.items || [];

    return {
        cmsBlockData,
        loading,
        error
    }
}

export default useFooter;