import useUserContext from "../../context/user/userProvider";
import {useMemo, useState} from "react";

const useOrders = () => {
    const { orders } = useUserContext();
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentOrder, setCurrentOrder] = useState(null);
    const maxVisiblePages = 6;

    const sortedOrders = useMemo(() => {
        return [...orders].sort((a, b) => b.order_number.localeCompare(a.order_number, undefined, { numeric: true }));
    }, [orders]);

    const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

    const currentOrders = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedOrders.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, itemsPerPage, sortedOrders]);

    const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages + 1));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    return {
        orders: currentOrders,
        itemsPerPage, setItemsPerPage,
        currentPage, setCurrentPage,
        maxVisiblePages,
        startPage,
        endPage,
        totalPages,
        currentOrder, onOrder: setCurrentOrder
    }
}

export default useOrders;