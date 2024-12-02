export const MENU_ITEMS = [
    {
        id: 'home',
        icon: 'fa-home',
        label: 'Trang chủ',
        path: '/admin/home',
    },
    {
        id: 'house',
        icon: 'fa-bed',
        label: 'Tòa nhà',
        path: '/admin/house',
    },
    // {
    //     id: 'service',
    //     icon: 'fa-concierge-bell',
    //     label: 'Dịch vụ',
    //     path: '/admin/service',
    // },
    {
        id: 'incurred',
        icon: 'fa-plus-circle',
        label: 'Yêu cầu hỗ trợ',
        path: '/admin/user_request',
    },
    {
        id: 'report',
        icon: 'fa-chart-line',
        label: 'Báo cáo',
        hasSubmenu: true, // Cho phép có submenu
        subMenu: [
            {
                id: 'report-room-rent',
                icon: 'fa-file',
                label: 'Danh sách khách đang thuê phòng',
                path: '/admin/report/ReportRoomRent',
            },
            {
                id: 'report-customer-debt',
                icon: 'fa-file',
                label: 'Danh sách khách nợ tiền phòng',
                path: '/admin/report/ReportCustomerDebt',
            },
            {
                id: 'report-customer-contract-expired',
                icon: 'fa-file',
                label: 'Danh sách khách sắp hết hợp đồng',
                path: '/admin/report/ReportCustomerContractExpired',
            },
            {
                id: 'report-customer-deposit',
                icon: 'fa-file',
                label: 'Danh sách khách thuê đặt cọc',
                path: '/admin/report/ReportCustomerDeposit',
            },
            {
                id: 'report-room-person',
                icon: 'fa-file',
                label: 'Danh sách thành viên theo phòng',
                path: '/admin/report/ReportRoomPerson',
            },
        ],
    },
    {
        id: 'post',
        icon: 'fa-rectangle-ad',
        label: 'Đăng bài',
        path: '/admin/post',
    },
    {
        id: 'setting',
        icon: 'fa-cog',
        label: 'Thiết lập',
        path: '/setting',
    },
];
export const FOOTER_ITEMS = [
    {
        id: 'change-password',
        icon: 'fa-key',
        label: 'Thay đổi mật khẩu',
        path: '/Customer/ChangePassword',
    },
    {
        id: 'fullscreen',
        icon: 'fa-arrows-alt',
        label: 'FullScreen',
        path: '/Customer/ChangePassword',
    },
    {
        id: 'lock',
        icon: 'fa-lock',
        label: 'Lock',
        path: '/Customer/ChangePassword',
    },
    {
        id: 'logout',
        icon: 'fa-power-off',
        label: 'Đăng xuất',
        path: '/logout',
    },
];

export const MENU_WEBADMIN = [
    {
        id: 'home',
        icon: 'fa-home',
        label: 'Trang chính',
        path: '/webadmin/home',
    },
    {
        id: 'user-management',
        icon: 'fa-users',
        label: 'Quản lý người dùng',
        path: '/webadmin/user-management',
    },
    {
        id: 'advertisement-management',
        icon: 'fa-file-alt',
        label: 'Quản lý quảng cáo',
        path: '/webadmin/advertisement-management',
    },
    {
        id: 'service-packages',
        icon: 'fa-history',
        label: 'Quản lý gói dịch vụ',
        path: '/webadmin/service-packages',
    },
    {
        id: 'support',
        icon: 'fa-life-ring',
        label: 'Hỗ trợ',
        path: '/webadmin/support',
    },
    {
        id: 'settings',
        icon: 'fa-cog',
        label: 'Cài đặt',
        path: '/webadmin/settings',
    },
];
