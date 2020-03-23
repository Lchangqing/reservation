import React from 'react';
import {connect} from 'dva';
import Header from './Header'
import Introduction from './Introduction';
import Menu from './Menu';
import Footer from './Footer';
import Booking from './Booking';
import './style.css';
class RestaurantPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ad:this.props.location.state.ad
        } 
    }
    componentDidMount() {
        this.node.scrollIntoView();
    }
    render() {
        return(
            <div className="cq-detail" ref={node => this.node = node}>
                <Header name={this.state.ad.name}  img={this.state.ad.img}/>
                <Introduction img={this.state.ad.img} description={this.state.ad.description}/>
                <Booking id={this.state.ad.id}/>
                <Menu id={this.state.ad.id}/>
                <Footer/>
            </div>
        )
    }
}
export default connect()(RestaurantPage)