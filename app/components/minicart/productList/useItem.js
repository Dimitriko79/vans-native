import {useCallback, useEffect, useState} from "react";
import {Alert} from "react-native";
import useCartProvider from "../../../context/cart/cartProvider";
import {useMutation} from "@apollo/client";
import {REMOVE_ITEM_MUTATION} from "../miniCartQuery.gql";

const useItem = () => {

    const { cartId, startFetchCart } = useCartProvider();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [itemForRemoving, setItemForRemoving] = useState(null);

    const [
        removeItem,
        {
            loading: removeItemLoading,
            called: removeItemCalled,
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
            } catch (e) {
                Alert.alert(e.message);
                // Error is logged by apollo link - no need to double log.
            } finally {
                await startFetchCart(true);
                setItemForRemoving(null);
            }
        },
        [removeItem, cartId]
    );

    const confirmDeletionOfItem = () => {
        setIsOpenModal(true);
    }

    useEffect(() => {
        if(itemForRemoving) {
            setIsOpenModal(false);
            handleRemoveItem(itemForRemoving);
        }
    }, [itemForRemoving]);

    return {
        setItemForRemoving,
        isOpenModal, setIsOpenModal,
        confirmDeletionOfItem,
        loading: (removeItemCalled && removeItemLoading),
    }
}

export default useItem;