import React from 'react';
import {connect} from 'dva';
class Item extends React.Component{
    render(){
        return(
            <div className="menus d-flex ">
                <div className="menu-img" style={{backgroundImage: 'url(images/dish-4.jpg)'}}></div>
                <div className="text d-flex">
                    <div className="one-half">
                        <h3>Fruit Vanilla Ice Cream</h3>
                        <p><span>Meat</span>, <span>Potatoes</span>, <span>Rice</span>, <span>Tomatoe</span></p>
                    </div>
                    <div className="one-forth">
                        <span className="price">$29</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect()(Item)