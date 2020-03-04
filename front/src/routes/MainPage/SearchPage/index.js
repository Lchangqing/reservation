import React from 'react';
import { connect } from 'dva';
import ItemPage from './ItemPage'
import {getAd} from '../../../services/restaurant';
import '../style.css';
import './index.css';
class SearchPage extends React.Component {
    constructor(props){
        super(props)
        this.state={
            ads:[]
        }
        this.getItems();
        console.log('constructor');
    }
    getItems(){
        getAd().then(rsp=>{ 
            console.log('+++++++++++=rsp22',rsp);
            const ads = rsp.map(item=>
                {
                    return <ItemPage ad={item}/>
                }
            );
            this.setState({ads});
        });
    }
    getItem() {
        let items = [];
        for (let i = 1; i < 2; i++) {
            items.push(<ItemPage />)
        }
        return items;
    }
    render() {
        const { ads } = this.state;
        console.log('ads======',ads)
        return (
            <div id="colorlib-main">
                <section class="slider d-flex align-items-center" style={{ backgroundImage: 'url(images/slider.jpg)'}}> 
                    <div class="container">
                        <div class="row d-flex justify-content-center">
                            <div class="col-md-12">
                                <div class="slider-title_box">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="slider-content_wrap">
                                                <h1>好店尽在订餐吧</h1>
                                                <h5>紫驼之峰出翠釜，水精之盘行素鳞；犀箸餍饫久未下，鸾刀缕切空纷纶；黄门飞鞚不动尘，御厨络绎送八珍。.</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row d-flex justify-content-center" style={{marginBottom:30}}> 
                                        <div class="col-md-10">
                                            <form class="form-wrap mt-4">
                                                <div class=" btn-group offset-2" role="group" aria-label="Basic example">
                                                    <input type="text" placeholder="" class="btn-group1 col-5" />
                                                    <button type="submit" class="btn-form"><span class="icon-magnifier search-icon col-3"></span>搜索<i class="pe-7s-angle-right"></i></button>
                                                </div>
                                            </form>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ftco-no-pt ftco-no-pb" style={{background:'#f1f1f1'}}> 
                    <div className="container px-0">
                        <div className="row no-gutters">
                            <div className="col-12 cq-command addtop">
                                <i className="icon-restaurant_menu" style={{marginRight:5}}/>
                                共有10家店铺
                                <i className="icon-hand-o-right" style={{marginLeft:5}}/>
                            </div> 
                            {ads}
                            <div className="cq-line col-12"/>
                            <div className="col-12 cq-command ">
                                <i className="icon-thumbs-o-up" style={{marginRight:5}}/>
                                好店推荐
                                <i className="icon-hand-o-right" style={{marginLeft:5}}/> 
                            </div>
                            {ads}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default connect()(SearchPage)