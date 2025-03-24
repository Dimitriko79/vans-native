import useUserContext from "../../context/user/userProvider";
import {useMutation} from "@apollo/client";
import {REMOVE_CUSTOMER_ADDRESS} from "./address.gql";
import {useCallback, useState} from "react";
import {router} from "expo-router";

const useAddress = () => {
    const {user, getUserData, setUserUpdate} = useUserContext();
    const {addresses} = user;
    const shippingAddressDefault = addresses.find((address) => address.default_shipping);
    const billingAddressDefault = addresses.find((address) => address.default_billing);
    const customAddresses = addresses.filter((address) => !address.default_billing && !address.default_shipping);
    const [errorMessage, setErrorMessage] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [updateAddress, setUpdateAddress] = useState(null);
    const [addressId, setAddressId] = useState(null);

    const [fetchRemoveCustomerAddress, {loadingRemoveCustomerAddress}] = useMutation(REMOVE_CUSTOMER_ADDRESS);

    const handleRemoveAddress = useCallback(async () => {
        try {
            setIsOpenModal(false);
            await fetchRemoveCustomerAddress({variables: {id: addressId}});
            await getUserData();
            setUserUpdate(true);
            setAddressId(null);
            router.push({ pathname: "/account" });
        } catch(e) {
            console.log(e);
            setErrorMessage([e.message]);
            setIsOpenModal(false);
        }
    }, [fetchRemoveCustomerAddress, addressId])

    return {
        shippingAddressDefault,
        billingAddressDefault,
        customAddresses,
        errorMessage,
        handleRemoveAddress,
        onErrorMessage: setErrorMessage,
        isOpenModal, setIsOpenModal,
        setAddressId,
        isAddingAddress, setIsAddingAddress,
        updateAddress, setUpdateAddress
    }
}

export default useAddress;