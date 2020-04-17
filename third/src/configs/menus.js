import {
    PieChartOutlined,
    TeamOutlined,
    ShopOutlined
} from '@ant-design/icons';
export default [
    { title: '广告位管理', icon: (<PieChartOutlined />), path: '/adPage' },
    { title: '用户管理', icon: (<TeamOutlined />), path: '/userPage' },
    { title: '店铺管理', icon: (<TeamOutlined />), path: '/restaurantPage' },
    // {
    //     title: '店铺管理', icon: (<ShopOutlined />), children: [
    //         { title: '组件管理', path: '/factory/moduleList', },
    //         { title: 'UI管理', path: '/factory/uiList' },
    //     ]
    // }
]