import {useCallback} from "react";
import {Alert} from "react-native";
import useCartProvider from "../../../context/cart/cartProvider";
import {useMutation} from "@apollo/client";
import {REMOVE_ITEM_MUTATION} from "../miniCartQuery.gql";

const useItem = () => {

    const { cartId, startFetchCart } = useCartProvider();

    const [
        removeItem,
        {
            loading: removeItemLoading,
            called: removeItemCalled,
            error: removeItemError
        }
    ] = useMutation(REMOVE_ITEM_MUTATION);

    const handleRemoveItem = useCallback(
        async id => {
            try {
                await removeItem({
                    variables: {
                        cartId,
                        itemId: Number(id)
                    }
                });
                await startFetchCart(true);
            } catch (e) {
                Alert.alert(e.message);
                await startFetchCart(false);
                // Error is logged by apollo link - no need to double log.
            }
        },
        [removeItem, cartId]
    );

    return {
        handleRemoveItem,
        loading: (removeItemCalled && removeItemLoading),
    }
}

export default useItem;