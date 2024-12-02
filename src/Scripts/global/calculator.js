export const handleDigitClick = (value, expression, setExpression, setScreenValue) => {
    const newExpression = expression + value;
    setExpression(newExpression);
    setScreenValue((prev) => (prev === "0" ? value : prev + value));
};

export const handleOperatorClick = (value, expression, setExpression, setScreenValue) => {
    if (!/[\+\-\*\/]$/.test(expression)) {
        const newExpression = expression + value;
        setExpression(newExpression);
        setScreenValue((prev) => prev + value);
    }
};

export const handleClear = (setExpression, setScreenValue) => {
    setExpression("");
    setScreenValue("0");
};

export const handleEqual = (expression, setExpression, setScreenValue) => {
    try {
        const result = eval(expression); // Tránh sử dụng eval nếu ứng dụng thực tế
        const formattedResult = result % 1 !== 0 ? result.toFixed(2) : result.toString();
        setScreenValue(formattedResult);
        setExpression(formattedResult);
    } catch (error) {
        setScreenValue("Error");
    }
};
