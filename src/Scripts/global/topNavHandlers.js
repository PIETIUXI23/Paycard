// Toggle trạng thái sidebar
export const toggleNavHandler = (isNavMd, setIsNavMd) => {
    const nextState = !isNavMd;
    setIsNavMd(nextState);
    if (nextState) {
        document.body.classList.add("nav-md");
        document.body.classList.remove("nav-sm");
    } else {
        document.body.classList.add("nav-sm");
        document.body.classList.remove("nav-md");
    }
};

// Hiển thị modal máy tính
export const openCalculatorHandler = () => {
    document.body.classList.add("modal-open");
    document.body.style.paddingRight = "20px";

    const modal = document.getElementById("CalculatorModal");
    modal.classList.add("in");
    modal.style.display = "block";
    modal.style.paddingRight = "20px";

    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop fade in";
    backdrop.id = "calculator-backdrop";
    document.body.appendChild(backdrop);

    backdrop.addEventListener("click", closeCalculatorHandler);
};

// Đóng modal máy tính
export const closeCalculatorHandler = () => {
    document.body.classList.remove("modal-open");
    document.body.style.paddingRight = "";

    const modal = document.getElementById("CalculatorModal");
    if (modal) {
        modal.classList.remove("in");
        modal.style.display = "none";
    }

    const backdrop = document.getElementById("calculator-backdrop");
    if (backdrop) {
        document.body.removeChild(backdrop);
    }
};
