import React from 'react';
import {connect} from 'dva';
import Header from './Header'
import Introduction from './Introduction';
import Menu from './Menu';
import Footer from './Footer';
import './style.css';
class RestaurantPage extends React.Component{
    render() {
        return(
            <div>
                <Header/>
                <Introduction/>
                <Menu/>
                <Footer/>
            </div>
        )
    }
}
export default connect()(RestaurantPage)