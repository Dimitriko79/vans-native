import {useState} from "react";
import {View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions, Image} from "react-native";
import {useLocalSearchParams} from "expo-router";
import {useProduct} from "./components/product/useProduct";
import ProductOptions from "./components/product/ProductOptions";
import SizeChart from "./components/product/SizeChart";
import Price from "./components/price/price";
import AddToCart from "./components/cart/addToCart";

const { width } = Dimensions.get("window");
const { height } = Dimensions.get("window");
  const calcPoints = price => {
        return " " + price/10 + " ";
    }
const Product = () => {
    const { urlKey } = useLocalSearchParams();
    const talonProps = useProduct(urlKey);
    const {
        productData,
        loading,
        error
    } = talonProps;
    const [selectedValue, setSelectedValue] = useState({});
    const [item, setItem] = useState({});
    const [showError, setShowError] = useState(false);
    if (loading) return <ActivityIndicator style={{height: height / 1.2}}/>;
    if(error) return <Text>Error</Text>;

    const handleValueChange = (attributeCode, value) => {
      setSelectedValue( {...selectedValue,[attributeCode]: value});
    };
    const handlePress = () => {
    if (Object.keys(selectedValue).length === 0)
        setShowError(true);
      else
        setShowError(false);
    };

    console.log('error', error);
    console.log('productData', productData);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.product_top_details}>
                    <Text style={styles.product_name}>{productData.name}</Text>
                    <Text style={styles.product_sku}>
                        <Text style={styles.product_attribute_label}>מק״ט:  </Text>
                        {productData.sku}
                    </Text>
                    <View style={styles.item_price_wrapper}>
                       <Text style={styles.item_price}>
                           <Price value={productData.price_range.maximum_price.regular_price.value} currencyCode={productData.price_range.maximum_price.regular_price.currency} style={styles} />
                        </Text>
                    </View>
                    <Text style={styles.product_gender}>
                        <Text style={styles.product_attribute_label}>מגדר:  </Text>
                         נשים
                    </Text>
                    <Text style={styles.membership_points}>
                         חברי VANS CLAB תוכלו לצבור
                         {calcPoints(productData.price_range.maximum_price.regular_price.value)}
                          נקודות*
                     </Text>
                    <Image style={styles.item_image} source={{uri: productData.image.url}} resizeMode="cover" />
                    <Text style={styles.choose_color}>
                        <Text style={styles.product_attribute_label}>צבע:  </Text>
                            {productData.color}
                    </Text>
                    <ProductOptions configurableOptions={productData.configurable_options} selectedValue={selectedValue} onValueChange={handleValueChange} />
                    {showError && <Text style={styles.showError}>יש לבחור מידה</Text>}
                    <SizeChart/>
                    <AddToCart item={item} onPress={handlePress}/>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: "#f1f2ed",

    },
    product_top_details: {
        textAlign: "right",
        direction: "rtl",
        paddingRight: 10,
        paddingLeft: 10,

    },
    product_attribute_label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    product_name: {
        fontSize: 20,
        fontWeight: 700,
        marginBottom: 20,
        marginTop: 20,
        textTransform: "uppercase"
    },
    product_sku: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 20,
    },
    product_gender: {
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 20,
        marginTop: 20,
    },
    item_price: {
        fontSize: 16,
        color: "#c9192e",
    },
    membership_points: {
        fontSize: 16,
        letterSpacing: 0.8,
        color: '#000',
        textShadowColor: '#f7f84c',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
        fontWeight: 'bold',
        marginBottom: 20,
//         marginTop: 20,
      },
      item_image: {
          height: width - 20,
          width: width - 20,
          backgroundColor: "#ffffff",
          paddingBottom: 30,
          borderBottom: 1
        },
      choose_color: {
          paddingTop: 20,
          marginTop: 20,
          borderTopWidth: 1,
          borderTopColor: '#ccc',
          fontSize: 16,
      },
      showError: {
        color: "red",
        fontSize: 16,
        marginBottom: 5,
      }
});

export default Product;


