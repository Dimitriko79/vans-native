import {useState} from "react";

const useFilterBlock = ({setCurrentFilter = () => {}, currentFilter = new Map()}) => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleFilter = (attr, code, type) => {
        setCurrentFilter(prevFilter => {
            const newFilter = new Map(prevFilter);

            if (type === "add") {
                if (attr === "price") {
                    newFilter.set(attr, [code]);
                } else {
                    const existingCodes = newFilter.get(attr) || [];
                    newFilter.set(attr, [...existingCodes, code]);
                }
            } else if (type === "remove") {
                const existingCodes = newFilter.get(attr) || [];
                const updatedCodes = existingCodes.filter(el => el !== code);

                if (updatedCodes.length > 0) {
                    newFilter.set(attr, updatedCodes);
                } else {
                    newFilter.delete(attr);
                }
            }
            return newFilter;
        });
    };

    const checkedForSelected = (attr, code) => {
        const codes = currentFilter.get(attr);
        if(codes && codes.length) {
            return codes.includes(code);
        }
        return false;
    }

    return{
        isOpen,
        onToggle,
        handleFilter,
        checkedForSelected
    }
}

export default useFilterBlock;