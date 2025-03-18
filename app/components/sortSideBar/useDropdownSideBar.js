import {useCallback, useEffect, useState} from "react";

const useDropdownSideBar = ({ isFetching, setIsFetching }) => {
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenSort, setIsOpenSort] = useState(false);

    const onToggle = useCallback((type) => {

        if (type === 'sort') {
            setIsOpenSort(prev => {
                setIsOpenFilter(false);
                return !prev;
            });
        } else if (type === 'filter') {
            setIsOpenFilter(prev => {
                setIsOpenSort(false);
                return !prev;
            });
        } else {
            setIsOpenFilter(false);
            setIsOpenSort(false);
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

export default useDropdownSideBar;