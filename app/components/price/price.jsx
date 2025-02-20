import patches from "../../../utils/intlPatches";
import {Text, View} from "react-native";

const Price = (props) => {
    const { value, currencyCode, style = {} } = props;

    const formatter = new Intl.NumberFormat('he-IL', {
        style: 'currency',
        currency: currencyCode
    });

    const parts = typeof patches.toParts === 'function'
        ? patches.toParts.call(formatter, value)
        : formatter.formatToParts(value);

    const children = parts.map((part, i) => {

        const partClass = style[part.type === 'currency' ? part.type  : 'value' ] || '';
        const key = `${i}-${part.value}`;

        return (
            <Text key={key} style={partClass}>
                {part.value === 'ILS' ? '₪ ' : part.value}
            </Text>
        );
    });

    return <Text style={style.price}>{children}</Text>;
};

export default Price;