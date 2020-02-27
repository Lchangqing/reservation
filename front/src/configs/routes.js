import MainPage from '../routes/MainPage'
import DetailPage from '../routes/DetailPage'
import SearchPage from '../routes/MainPage/SearchPage'
import AdPage from '../routes/MainPage/AdPage'
import RestaurantPage from '../routes/RestaurantPage'
export default [
    {
        path:'/',
        exact:true,
        component:AdPage,
    },
    {
        path:'/SearchPage',
        component:SearchPage
    },
    {
        path:'/DetailPage',
        // exact:true,
        component:DetailPage,
    },
    {
        path:'/RestaurantPage',
        // exact:true,
        component:RestaurantPage,
    }
]