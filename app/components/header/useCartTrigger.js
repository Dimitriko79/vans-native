import {useLazyQuery, useQuery} from '@apollo/client';
import {useCartProvider} from "../../context/cart/cartProvider";
import {useEffect, useState} from "react";

export const useCartTrigger = props => {

    const { details } = useCartProvider();

    const itemCount = details?.total_quantity || 0
    return {
        itemCount
    };
};
