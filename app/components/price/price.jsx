import React, { useMemo } from "react";
import patches from "../../../utils/intlPatches";
import { Text } from "react-native";

const Price = ({ value = 0, currencyCode = "ILS", style = {} }) => {
    const formatter = useMemo(() =>
            new Intl.NumberFormat("he-IL", { style: "currency", currency: currencyCode }),
        [currencyCode]
    );

    const parts = useMemo(() => {
        return typeof patches?.toParts === "function"
            ? patches.toParts.call(formatter, value)
            : formatter.formatToParts?.(value) || [{ type: "value", value: value.toString() }];
    }, [formatter, value]);

    return (
        <Text style={style.price}>
            {parts.map((part, i) => (
                <Text key={`${i}-${part.value}`} style={style[part.type === "currency" ? "currency" : "value"]}>
                    {part.value === "ILS" ? "₪ " : part.value}
                </Text>
            ))}
        </Text>
    );
};

export default Price;
