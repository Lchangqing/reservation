import React from 'react';
import { connect } from 'dva';
import Header from './Header';
import Introduction from './Introduction';
import Menu from './Menu';
import Footer from './Footer';
import Booking from './Booking';
import './style.css';
class RestaurantPage extends React.Component {
    componentDidMount() {
        this.node.scrollIntoView();
    }
    render() {
        const { ad } = this.props.location.state;
        return (
            <div className="cq-detail" ref={node => this.node = node} key={ad.name}>
                <Header name={ad.name} img={ad.img} rid={ad.id} />
                <Introduction ad={ad} rid={ad.id} />
                <Booking id={ad.id} restaurant_name={ad.name} rid={ad.id} />
                <Menu id={ad.id} rid={ad.id} />
                <Footer />
            </div>
        )
    }
}
export default connect()(RestaurantPage)