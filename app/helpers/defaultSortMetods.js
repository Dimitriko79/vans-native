const DEFAULT_SORT_METHODS = new Map([
    [
        'position',
        {
            label: 'Position',
            value: 'position',
            sortDirection: 'ASC'
        }
    ],
    [
        'name',
        {
            label: 'Product Name',
            value: 'name',
            sortDirection: 'ASC'
        }
    ],
    [
        'price',
        {
            label: 'Price',
            value: 'price',
            sortDirection: 'ASC'
        }
    ],
    [
        'color',
        {
            label: 'צבע',
            value: 'color',
            sortDirection: 'ASC'
        }
    ],
    [
        'size',
        {
            label: 'Size',
            value: 'size',
            sortDirection: 'DESC'
        }
    ],
    [
        'gender_filter',
        {
            label: 'מגדר',
            value: 'gender_filter',
            sortDirection: 'ASC'
        }
    ],
    [
        'pattern',
        {
            label: 'Pattern',
            value: 'pattern',
            sortDirection: 'ASC'
        }
    ]
])

export default DEFAULT_SORT_METHODS;