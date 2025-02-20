import {useEffect, useState} from "react";

export const useFilterSidebar = ({isFetching, setIsFetching}) => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        if(isFetching && isOpen) {
            onToggle();
        }
        return setIsFetching(false);
    }, [isFetching, isOpen]);

    return{
        isOpen,
        onToggle
    }
}