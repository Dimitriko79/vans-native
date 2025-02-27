export const isProductConfigurable = product =>
    product?.__typename === 'ConfigurableProduct';