export function formatCurrencyVN(number) {
    if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + ' tỷ';
    } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + ' triệu';
    } else if (number >= 1e3) {
        return (number / 1e3).toFixed(2) + ' nghìn';
    } else {
        return number.toString();
    }
}

// Ví dụ sử dụng
const price1 = 2000000000;
const price2 = 5000000;
const price3 = 900000;

console.log(formatCurrencyVN(price1)); // Output: 2.00 tỷ
console.log(formatCurrencyVN(price2)); // Output: 5.00 triệu
console.log(formatCurrencyVN(price3)); // Output: 900 nghìn
