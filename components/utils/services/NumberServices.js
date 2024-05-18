export const trimStringNumberToDecimals = (strNum, decimals) => {
    const decimalIndex = strNum.indexOf('.');

    if (decimalIndex === -1 || strNum.length <= decimalIndex + decimals) {
        return strNum;
    }

    return strNum.substring(0, decimalIndex + decimals + 1);
}

export const minNumber = (a, b) => {
    return a < b ? a : b;
}