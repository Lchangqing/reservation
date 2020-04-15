import AdPage from '../routes/AdPage';
import UserPage from '../routes/UserPage';
export default [
    {
        path: '/adPage',
        exact: true,
        component: AdPage,
    },
    {
        path: '/userPage',
        exact: true,
        component: UserPage
    },
    {
        path: '/',
        exact: true,
        component: AdPage
        // render: props => <Redirect to="/factory/PageList" />,
    },
]