import React, { useState } from "react";
import "./Calculator.scss";

// Import các hàm từ calculator.js
import {
    handleDigitClick,
    handleOperatorClick,
    handleClear,
    handleEqual,
} from "~/Scripts/global/calculator";

const CalculatorModal = () => {
    const [screenValue, setScreenValue] = useState("0"); // Giá trị hiển thị trên màn hình
    const [expression, setExpression] = useState(""); // Biểu thức hiện tại

    const closeCalculator = () => {
        document.body.classList.remove("modal-open");
        document.body.style.paddingRight = "";

        const modal = document.getElementById("CalculatorModal");
        modal.classList.remove("in");
        modal.style.display = "none";

        const backdrop = document.getElementById("calculator-backdrop");
        if (backdrop) document.body.removeChild(backdrop);
    };

    return (
        <div
            className="modal fade"
            id="CalculatorModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog" role="document" style={{ width: "390px" }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Máy tính
                        </h5>
                        <button
                            type="button"
                            className="close"
                            onClick={closeCalculator}
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="centered card">
                            <div className="calc-card">
                                <button id="clear" onClick={() => handleClear(setExpression, setScreenValue)}>
                                    C
                                </button>
                                <div id="screen" className="screen">
                                    {screenValue}
                                </div>
                                <div className="buttons">
                                    {["7", "8", "9", "/", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "="].map(
                                        (button) => (
                                            <button
                                                key={button}
                                                className={["/", "-", "+", "="].includes(button) ? "operator" : "digit"}
                                                onClick={
                                                    button === "="
                                                        ? () => handleEqual(expression, setExpression, setScreenValue)
                                                        : ["+", "-", "*", "/"].includes(button)
                                                            ? () => handleOperatorClick(button, expression, setExpression, setScreenValue)
                                                            : () => handleDigitClick(button, expression, setExpression, setScreenValue)
                                                }
                                            >
                                                {button}
                                            </button>
                                        )
                                    )}
                                    <button
                                        className="operator"
                                        id="multiply"
                                        onClick={() => handleOperatorClick("*", expression, setExpression, setScreenValue)}
                                    >
                                        x
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={closeCalculator}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalculatorModal;
