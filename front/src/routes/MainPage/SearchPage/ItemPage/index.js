import React from 'react';
import { connect } from 'dva';
import './index.css';
class ItemPage extends React.Component {
    render() {
        const {ad} = this.props;
        return (
            <div className="col-md-12 blog-wrap">
                <div className="row no-gutters align-items-center" style={{margin:'5px 0'}}>
                    <div className="col-md-6 img  cq-height" style={{ backgroundImage: `url(${ad.img})` }}>

                    </div>
                    <div className="col-md-6">
                        <div className="text p-md-5 p-4 ">
                            <div className="heading">
                                <h2 className="mb-5"><a href="single.html">{ad.name}</a></h2>
                            </div>
                            <p>{ad.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(ItemPage);