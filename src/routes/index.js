//Layouts
import { Ad_Layout } from '~/components/Layout';
import { Admin_Layout } from '~/components/Layout';
import Admin from '~/pages/Admin/Home';
import Detail from '~/pages/Advertisement/Detail';
import Home from '~/pages/Advertisement/Home';
import AdHome from '~/pages/Admin/Home';
import Electric from '~/pages/Admin/Electric';
import Debt from '~/pages/Admin/Report/Debt';
import Deposit from '~/pages/Admin/Report/Deposit';
import Expired from '~/pages/Admin/Report/Expired';
import Person from '~/pages/Admin/Report/Person';
import Rent from '~/pages/Admin/Report/Rent';

import Room from '~/pages/Admin/Room';
import Post from '~/pages/Admin/Post';
import Service from '~/pages/Admin/Service';
import EmailHistory from '~/pages/Admin/EmailHistory';
import RegisterSuccesful from '~/pages/Public/RegisterSuccessful';
import RegisterFailure from '~/pages/Public/RegisterFailure';
import NoPermission from '~/pages/Public/NoPermission';
import AddProperties from '~/pages/Admin/AddProperties';
import Properties from '~/pages/Admin/Properties';
import WebAdminHome from '~/pages/WebAdmin/WebAdminHome';
import AdvertisementManagement from '~/pages/WebAdmin/AdvertisementManagement';
import ServicePakages from '~/pages/WebAdmin/ServicePackages';
import Support from '~/pages/WebAdmin/Support';
import UserManagement from '~/pages/WebAdmin/UsersManagament';
import AdvertisementPage from '~/pages/Admin/AdvertisementPage';
import InputWaterElectric from '~/pages/Admin/InputWaterElectric';
import EditRoom from '~/pages/Admin/EditRoom';
import AddService from '~/pages/Admin/AddService';
import AddRoom from '~/pages/Admin/AddRoom';
import EditService from '~/pages/Admin/EditService';
import EditProperties from '~/pages/Admin/EditProperties';
import UserRequest from '~/pages/Admin/UserRequest/UserRequest';
import AdminSupport from '~/pages/Admin/UserRequest/AdminSupport';
import TenantManagement from '~/pages/Admin/TenantManagement';
import AddTenant from '~/pages/Admin/AddTenant';
import EditTenant from '~/pages/Admin/EditTenant';

//public la khong can dang nhap
const publicRoutes = [
    { path: '/', component: Home, layout: Ad_Layout },
    { path: '/advertisement/:id', component: Detail, layout: Ad_Layout },
    { path: '/successful', component: RegisterSuccesful },
    { path: '/failure', component: RegisterFailure },
    { path: '/no-permission', component: NoPermission },
];
//private phai dang nhap neu khong no dan sang ben dang nhap
const privateRoutes = [
    { path: '/admin/home', component: AdHome, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/electric', component: Electric, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/report/ReportRoomRent', component: Rent, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/report/ReportCustomerDebt', component: Debt, layout: Admin_Layout, role: 'ROLE_USER' },
    {
        path: '/admin/report/ReportCustomerContractExpired',
        component: Expired,
        layout: Admin_Layout,
        role: 'ROLE_USER',
    },
    { path: '/admin/report/ReportCustomerDeposit', component: Deposit, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/report/ReportRoomPerson', component: Person, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/room', component: Room, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/email', component: EmailHistory, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/house', component: Properties, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/house/add', component: AddProperties, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/house/edit/:id', component: EditProperties, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/house/room/:id', component: Room, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin', component: Admin, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/post', component: AdvertisementPage, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/post/add', component: Post, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/inpWE/:id', component: InputWaterElectric, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/room/add/:id', component: AddRoom, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/room/edit/:id', component: EditRoom, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/service/:id', component: Service, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/service/add/:id', component: AddService, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/service/edit/:id', component: EditService, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/tentnant', component: TenantManagement, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/tenants/add/:id', component: AddTenant, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/tenants/edit/:id', component: EditTenant, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/admin/user_request', component: UserRequest, layout: Admin_Layout, role: 'ROLE_USER' },
    { path: '/webadmin', component: WebAdminHome, layout: Admin_Layout, role: 'ROLE_ADMIN' },
    { path: '/webadmin/support', component: AdminSupport, layout: Admin_Layout, role: 'ROLE_ADMIN' },
    {
        path: '/webadmin/advertisement-management',
        component: AdvertisementManagement,
        layout: Admin_Layout,
        role: 'ROLE_ADMIN',
    },
    { path: '/webadmin/service-packages', component: ServicePakages, layout: Admin_Layout, role: 'ROLE_ADMIN' },
    { path: '/webadmin/support', component: Support, layout: Admin_Layout, role: 'ROLE_ADMIN' },
    { path: '/webadmin/user-management', component: UserManagement, layout: Admin_Layout, role: 'ROLE_ADMIN' },

    // { path: '/admin/admin', component: },
];

export { publicRoutes, privateRoutes };
