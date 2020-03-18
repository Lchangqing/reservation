import React from 'react';
import {connect} from 'dva';
import { Link } from "dva/router";
import './index.css'
class ItemPage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            ad:null
        }
    }
    render(){
        const {ad} = this.props; 
        console.log('===================ad',ad)
        return(
            <div className="col-md-4 d-flex">
                <div className="blog-entry">
                    <Link to={{pathname:"/RestaurantPage",state:{ad:ad}}} className="img" style={{backgroundImage: `url(${ad.img})`}}/>
                    <div className="text p-4">
                        <h3 className="mb-2"><Link to={{pathname:"/RestaurantPage",state:{ad:ad}}}>{ad.name}</Link></h3>
                        <div className="meta-wrap">
                            <p className="meta cq-meta">
                                <span><i className="icon-room_service mr-2"></i>{ad.class}</span>
                                <span><a className="cq-address"><i className="icon-globe mr-2"></i>{ad.address}</a></span>
                            </p>
                        </div>
                        <p className="mb-4 cq-description">{ad.description}</p>
                        <p><Link to={{pathname:"/RestaurantPage",state:{ad:ad}}} className="btn-custom">进店看 <span className="ion-ios-arrow-forward"></span></Link></p>
		            </div>
				</div>
			</div>
        )
    }
}
export default connect()(ItemPage);