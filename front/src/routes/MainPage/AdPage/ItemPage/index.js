import React from 'react';
import {connect} from 'dva';
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
        console.log('===================ad',ad.name)
        return(
            <div className="col-md-4 d-flex">
                <div className="blog-entry">
                    <a href="single.html" className="img" style={{backgroundImage: `url(${ad.img})`}}/>
                    <div className="text p-4">
                        <h3 className="mb-2"><a href="single.html">{ad.name}</a></h3>
                        <div className="meta-wrap">
                            <p className="meta cq-meta">
                                <span><i className="icon-room_service mr-2"></i>{ad.class}</span>
                                <span><a className="cq-address"><i className="icon-globe mr-2"></i>{ad.address}</a></span>
                            </p>
                        </div>
                        <p className="mb-4 cq-description">{ad.description}</p>
                        <p><a href="#" className="btn-custom">进店看 <span className="ion-ios-arrow-forward"></span></a></p>
		            </div>
				</div>
			</div>
        )
    }
}
export default connect()(ItemPage);