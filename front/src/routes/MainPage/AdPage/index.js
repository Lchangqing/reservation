/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import {connect} from 'dva';
import ItemPage from './ItemPage'
import {getAd} from '../../../services/restaurant'
class AdPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            ads:[]
        }
        this.getItems();
    }
    getItems(){
        getAd().then(rsp=>{ 
            console.log('+++++++++++=rsp',rsp);
            const ads = rsp.map(item=>
                {
                    return <ItemPage ad={item}/>
                }
            );
            this.setState({ads})
        });
    }
    test(){
        let item = []
        for(let i=0;i<7;i++){
            item.push(<ItemPage/>)
        }
        return item
    }
    render(){
        const { ads } = this.state;
        return(
            <div id="colorlib-main">
			<section class="ftco-no-pt ftco-no-pb bg-light">
				<div class="container px-0">
                    <div class="row no-gutters">
                        {ads}
					</div>
				</div>
			</section>
		</div>
        );
    }
};
export default connect()(AdPage);