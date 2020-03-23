import React from 'react';
import {connect} from 'dva';
import {searchRePageGetMenus} from '../../../models/actionType';
import Classify from './Classify';
function mapStateToProps(state) {
    return { searchRePage: state.searchRePage };
}
class Menu extends React.Component{
    constructor(props){
        super(props);
        this.getMenus();
        this.state={
            menus:[],
            classify:[]
        }
    }
    async getMenus(){
        await this.props.dispatch({
            type:searchRePageGetMenus,
            payload:{id:this.props.id}
        })
        const {menus} = this.props.searchRePage;
        let classify = [];
        menus.forEach(i=>{
            classify.push(i.classify)
        })
        classify = Array.from(new Set(classify));
        console.log('>>>>>>>>>>>>>>..menus',menus);
        this.setState({menus,classify});
    }
    setMenus(){
        const {menus,classify} = this.state;
        if(!classify.length){
            return;
        }
        return classify.map((i,index)=>(
            <div className={`tab-pane fade ${index===0 ?`show active`:``}`} id={`v-pills-${index}`} role="tabpanel" aria-labelledby={`v-pills-${index}-tab`}>
                <Classify menus={menus} classify={i}/>
            </div>
        ))
    }
    getNavs(){
        const {classify} = this.state;
        if(!classify.length){
            return;
        } 
        return classify.map((i,index)=>(
            <a className={`nav-link py-3 px-4 ${index===0 ?`show active`:``}`} id={`v-pills-${index}-tab`} data-toggle="pill" href={`#v-pills-${index}`} role="tab" aria-controls={`v-pills-${index}`} aria-selected={index===0 ?`true`:`false`}><span className="flaticon-meat"></span> {i}</a>
        ))
    }
    render() {
        return(
            <section className="ftco-section bg-light">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-5">
                    <div className="col-md-7 text-center heading-section ">
                        <span className="subheading">Our Menu</span>
                        <h2>美味佳肴等待您的挖掘</h2>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 dish-menu">

                    <div className="nav nav-pills justify-content-center " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    
                    
                        {this.getNavs()}
                    </div>

                    <div className="tab-content py-5" id="v-pills-tabContent">
                        {this.setMenus()} 
                    <div className="col-sm-12 pt-4 text-center ">
                        <p>Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                    </div>
                    </div>
                </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default connect(mapStateToProps)(Menu)