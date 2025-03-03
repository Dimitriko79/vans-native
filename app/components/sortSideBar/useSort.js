import { useState } from 'react';
import DEFAULT_SORT_METHODS from "../../helpers/defaultSortMetods";

const defaultSort =  {
    label: 'Price',
    value: 'price',
    sortDirection: 'ASC'
};

const useSort = (props = {}) => {
    const { defaultSortMagento } = props;
    return useState(() =>
        Object.assign({}, defaultSortMagento ? DEFAULT_SORT_METHODS.get(defaultSortMagento) : defaultSort, props)
    );
};

export default useSort;
