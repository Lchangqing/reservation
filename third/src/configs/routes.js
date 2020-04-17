import AdPage from '../routes/AdPage';
import UserPage from '../routes/UserPage';
import RestaurantPage from '../routes/RestaurantPage';
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
        path: '/restaurantPage',
        exact: true,
        component: RestaurantPage
    },
    {
        path: '/',
        exact: true,
        component: AdPage
        // render: props => <Redirect to="/factory/PageList" />,
    },
]