import AdPage from '../routes/AdPage';
export default [
    {
        path:'/adPage',
        component:AdPage,
    },
    {
        path:'/',
        exact:true,
        component:AdPage
        // render: props => <Redirect to="/factory/PageList" />,
    }
]