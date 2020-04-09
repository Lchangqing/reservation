import AdPage from '../routes/AdPage';
export default [
    {
        path:'/adPage',
        exact:true,
        component:AdPage,
    },
    {
        path:'/',
        exact:true,
        component:AdPage
        // render: props => <Redirect to="/factory/PageList" />,
    }
]