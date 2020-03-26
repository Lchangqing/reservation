import React from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router';
class Item extends React.Component{
    render(){
        const {food} = this.props;
        return(
            <Link to={{pathname:"/DetailPage",state:{...food,img:`images/${food.img}.jpg`},rid:this.props.id}}>
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
            </Link>
        )
    }
}
export default connect()(Item)