import React from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import TopNav from '../../TopNav/TopNav';
import WaitingModal from '../../Modal/WaitingModal';
import NoteModal from '../../Modal/NoteModal';
import CalculatorModal from '../../Modal/CalculatorModal';

// Import các stylesheet
import 'src/Extension/bootstrap/dist/css/bootstrap.min.css';
//import "src/Extension/font-awesome/css/font-awesome.min.css";
//import "src/Extension/nprogress/nprogress.css";
//import "src/Extension/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css";
//import "src/Extension/bootstrap-daterangepicker/daterangepicker.css";
//import "src/Extension/toastr-master/toastr.min.css";
import 'src/Content/Custom.scss';
import 'jquery-ui/ui/widgets/tooltip';

const AdminLayout = ({ children }) => {
    return (
        <div>
            {/* Stylesheets */}
            <link href="jquery-ui/themes/base/all.css" rel="stylesheet" />
            <link href="bootstrap/dist/css/bootstrap.css" rel="stylesheet" />
            <link href="/Extension/bootstrap-big-grid-master/bootstrap-big-grid.min.css" rel="stylesheet" />
            <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
            <link href="nprogress/nprogress.css" rel="stylesheet" />
            <link href="icheck/skins/flat/green.css" rel="stylesheet" />
            <link href="bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" />
            <link href="jqvmap/dist/jqvmap.min.css" rel="stylesheet" />
            <link href="bootstrap-daterangepicker/daterangepicker.css" rel="stylesheet" />
            <link href="toastr-master/toastr.min.css" rel="stylesheet" />
            <link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />
            <link href="~/src/Extension/LayoutLib/layoutExtend.css" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
            <link href="~/src/Extension/datatables.net/css/jquery.dataTables.min.css" rel="stylesheet" />
            <link href="datatables.net-bs/css/dataTables.bootstrap.min.css" rel="stylesheet" />
            <link href="datatables.net-buttons-bs/css/buttons.bootstrap.min.css" rel="stylesheet" />
            <link href="~/src/Extension/datatables.net-select/css/select.dataTables.css" rel="stylesheet" />
            <link href="datatables.net-fixedheader-bs/css/fixedHeader.bootstrap.min.css" rel="stylesheet" />
            <link href="datatables.net-responsive-bs/css/responsive.bootstrap.min.css" rel="stylesheet" />
            <link href="datatables.net-scroller-bs/css/scroller.bootstrap.min.css" rel="stylesheet" />

            <div className="container body">
                <div className="main_container">
                    {/* Sidebar */}
                    <div className="col-md-3 left_col">
                        <Sidebar />
                    </div>

                    {/* Top Navigation */}
                    <div className="top_nav">
                        <TopNav />
                    </div>

                    {/* Main Content */}
                    <div className="right_col" role="main" style={{ minHeight: '361px' }}>
                        {children}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <WaitingModal />
            <NoteModal />
            <CalculatorModal />

            {/* Scripts */}
            <script src="jquery/dist/jquery.min.js"></script>
            <script src="bootstrap/dist/js/bootstrap.min.js"></script>
            <script src="moment/min/moment.min.js"></script>
            <script src="moment/locale/vi.js"></script>
            <script src="jquery.cookie/jquery.cookie.js"></script>
            <script src="toastr/build/toastr.min.js"></script>
            <script src="jquery-number-master/jquery.number.min.js"></script>
            <script src="~/src/Scripts/global/globalFunction.js"></script>
            <script src="~/src/Scripts/global/globalParameter.js"></script>
            <script src="~src/Scripts/global/mainExcute.js"></script>
            <script src="validator/validator.js"></script>
            <script src="~/src/Scripts/custom.min.js"></script>
        </div>
    );
};

export default AdminLayout;
