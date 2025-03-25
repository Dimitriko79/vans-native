export const initialState = {
    storeConfig: null,
    country: null,
    stores: [
        {
            id: 1,
            title: 'VANS Store Ramat Gan',
            coordinate: {
                latitude: 32.099957,
                longitude: 34.827156,
            }
        },
        {
            id: 2,
            title: 'VANS Store Petah Tikva',
            coordinate: {
                latitude: 32.093468,
                longitude: 34.866055,
            }
        },
        {
            id: 3,
            title: 'VANS Store Tel Aviv',
            coordinate: {
                latitude: 32.075111,
                longitude: 34.775,
            }
        },
        {
            id: 4,
            title: 'VANS Store Herzliya',
            coordinate: {
                latitude: 32.165132,
                longitude: 34.8240732,
            }
        },
        {
            id: 5,
            title: 'VANS Store Netanya Mall',
            coordinate: {
                latitude: 32.2791567,
                longitude: 34.8470676,
            }
        },
        {
            id: 6,
            title: 'VANS Outlet Rehovot',
            coordinate: {
                latitude: 31.893782,
                longitude: 34.807117,
            }
        },
        {
            id: 7,
            title: 'VANS Store Haifa',
            coordinate: {
                latitude: 32.7897693,
                longitude: 35.0080075,
            }
        }
    ]
};

export const storeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_STORE_CONFIG':
            return { ...state, storeConfig: action.payload };
        case 'SET_COUNTRY':
            return { ...state, country: action.payload };
        default:
            return state;
    }
};