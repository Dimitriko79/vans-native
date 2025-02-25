import {useCallback, useEffect, useState} from "react";

export const useDropdownSideBar = ({ isFetching, setIsFetching }) => {
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenSort, setIsOpenSort] = useState(false);

    const onToggle = useCallback((type) => {

        if (type === 'sort') {
            setIsOpenSort(prev => {
                setIsOpenFilter(false);
                return !prev;
            });
        }

        if (type === 'filter') {
            setIsOpenFilter(prev => {
                setIsOpenSort(false);
                return !prev;
            });
        }
    }, [isOpenFilter, isOpenSort, setIsOpenSort, setIsFetching]);

    useEffect(() => {
        if (isFetching) {
            setIsOpenSort(false);
            setIsOpenFilter(false);
            setIsFetching(false);
        }
    }, [isFetching]);

    return {
        isOpenFilter,
        isOpenSort,
        onToggle
    };
};