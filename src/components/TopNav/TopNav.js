import React, { useState } from "react";
import { Helmet } from "react-helmet"; // Import Helmet
import {
    toggleNavHandler,
    openCalculatorHandler,
} from "../../Scripts/global/topNavHandlers";

const TopNav = () => {
    const [isNavMd, setIsNavMd] = useState(true); // Trạng thái sidebar

    return (
        <div>
            <div className={`nav-${isNavMd ? "md" : "sm"}`}>
                <div className="nav_menu">
                    <nav>
                        <div className="nav toggle">
                            {/* Nút chuyển đổi sidebar */}
                            <a
                                id="menu_toggle"
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleNavHandler(isNavMd, setIsNavMd);
                                }}
                            >
                                <i className="fa fa-bars"></i>
                            </a>
                        </div>
                        <div
                            className="nav toggle"
                            style={{ float: "right", textAlign: "right", width: "150px" }}
                        >
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={openCalculatorHandler}
                                title="Máy tính"
                            >
                                <i className="fa fa-calculator"></i>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default TopNav;
