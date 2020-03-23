import React from 'react';
import {connect} from 'dva';
class Item extends React.Component{
    render(){
        const {food} = this.props;
        return(
            <div className="menus d-flex ">
                <div className="menu-img" style={{backgroundImage: `url(images/${food.img}.jpg)`}}></div>
                <div className="text d-flex">
                    <div className="one-half">
                        <h3>{food.name}</h3>
                        <p>{food.describe}</p>
                    </div>
                    <div className="one-forth">
                        <span className="price">￥{food.price}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(Item)