import { connect } from 'dva';
import React from 'react'
import {searchRePageGetLayout} from '../../../models/actionType'
import './main.css'
import './util.css'
function mapStateToProps(state) {
    return { searchRePage: state.searchRePage };
}
class Booking extends React.Component {
    constructor(props){
        super(props);
        this.getLayout();
        this.state={
            layout:null,
            seats:[],
            tables:[],
            windows:[],
            smoking:[],
            time:[],
            noTime:[],
            random:[]
        }
        this.tablesOnchang = this.tablesOnchang.bind(this);
        this.seatsOnchange = this.seatsOnchange.bind(this);
        this.areaOnchange = this.areaOnchange.bind(this);
        this.timeOnchang = this.timeOnchang.bind(this);

    }
    async getLayout(){
        await this.props.dispatch({
            type:searchRePageGetLayout,
            payload:{id:this.props.id}
        })
        let seats = [];
        let random = [];
        const {layout} = this.props.searchRePage
        const noTime = layout.noon.filter(i=>layout.night.indexOf(i)>-1);
        for(let i = 1 ; i <= layout.tables ; i++){
            seats.push(noTime.indexOf(i)>-1?0:1)
            random.push(i)
        }
        this.setState({layout,seats,tables:random,windows:random,smoking:random,time:noTime,noTime,random});
    }
    getSeats(){
        const {tables,windows,smoking,time} = this.state;
        let {seats} = this.state;
        seats = seats.map((i,index)=>{
            if(tables.indexOf(index+1)>-1 && windows.indexOf(index+1)>-1 && smoking.indexOf(index+1)>-1 && time.indexOf(index+1)===-1){
                return 1
            }else{
                return 0
            }
        })
        return seats.map((i,index)=>(
            <span class="item-gallery-footer wrap-pic-w" href="images/photo-gallery-01.jpg" data-lightbox="gallery-footer">
                {index+1}号桌
                {!i?<span className='cq-masking' />:null}
            </span> 
        ))
    }
    tablesOnchang(e){
        const {layout,random} = this.state;
        const tables = e.target.value;
        if(tables === ''){
            this.setState({tables:random})
        }else if(tables === 's'){
            this.setState({tables:layout.stables})
        }else if(tables === 'm'){
            this.setState({tables:layout.mtables})
        }else if(tables === 'l'){
            this.setState({tables:layout.ltables})
        }
    }
    seatsOnchange(e){
        const {layout,random} = this.state;
        const seats_ = e.target.value;
        if(seats_ === ''){
            this.setState({windows:random})
        }else if(seats_ === 'nw'){
            this.setState({windows:layout.no_window})
        }else if (seats_ === 'w'){
            this.setState({windows:layout.window})
        }
    }
    areaOnchange(e){
        const {layout,random} = this.state;
        const area = e.target.value;
        if(area === ''){
            this.setState({smoking:random})
        }else if(area === 'ns'){
            this.setState({smoking:layout.no_smoking})
        }else if (area === 's'){
            this.setState({smoking:layout.smoking})
        }
    }
    timeOnchang(e){
        const {layout,noTime} = this.state;
        const time = e.target.value;
        if(time === ''){
            this.setState({time:noTime})
        }else if(time === 'no'){
            this.setState({time:layout.noon})
        }else if (time === 'ni'){
            this.setState({time:layout.night})
        }
    }
    render() {
        const {layout} = this.state;
        console.log('getLayout',this.state.layout)
        return (
            <section class="section-booking bg1-pattern">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 p-b-30">
                            <div class="t-center">
                                <h3 class="tit9 t-center m-b-35 m-t-40">
                                    餐桌预定
						        </h3>
                            </div>

                            <form class="wrap-form-booking">
                                <div class="row">
                                    <div class="col-md-6">
                                        <span class="txt9">
                                        餐桌大小
                                    </span>

                                    <div class="wrap-inputtime size12 bo2 bo-rad-10 m-t-3 m-b-23">
                                        <select onChange={this.tablesOnchang} class="selection-1" name="餐桌大小">
                                            <option value=''>随机</option>
                                            <option value='s'>小桌（容纳1-6人）</option>
                                            <option value='m'>大桌（容纳6-12人）</option>
                                            <option value='l'>聚餐桌（容纳12-20人）</option>
                                        </select>
                                    </div>

                                        <span class="txt9">
                                            餐桌位置
								        </span>

                                        <div class="wrap-inputtime size12 bo2 bo-rad-10 m-t-3 m-b-23">
                                            <select onChange={this.seatsOnchange} class="selection-1" name="位置">
                                                <option value=''>随机</option>
                                                <option value='w'>临窗</option>
                                                <option value='nw'>不临窗</option>
                                            </select>
                                        </div>

                                        <span class="txt9">
                                            环境氛围
								        </span>

                                        <div class="wrap-inputpeople size12 bo2 bo-rad-10 m-t-3 m-b-23">
                                            <select onChange={this.areaOnchange} class="selection-1" name="环境">
                                                <option value=''>随机</option>
                                                <option value='ns'>雅静无烟区</option>
                                                <option value='s'>热闹区</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <span class="txt9">
                                            用餐时段
								        </span>

                                        <div class="wrap-inputpeople size12 bo2 bo-rad-10 m-t-3 m-b-23">
                                            <select onChange={this.timeOnchang} class="selection-1" name="环境">
                                                <option value=''>随机</option>
                                                <option value='no'>中午时段</option>
                                                <option value='ni'>傍晚时段</option>
                                            </select>
                                        </div>
                                        <span class="txt9">
                                            姓名
								        </span>

                                        <div class="wrap-inputname size12 bo2 bo-rad-10 m-t-3 m-b-23">
                                            <input class="bo-rad-10 sizefull txt10 p-l-20" type="text" name="name" placeholder="姓名" />
                                        </div>

                                        <span class="txt9">
                                            电话号码
								        </span>

                                        <div class="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                                            <input class="bo-rad-10 sizefull txt10 p-l-20" type="text" name="phone" placeholder="电话号码" />
                                        </div>
                                    </div>
                                </div>

                                <div class="wrap-btn-booking flex-c-m m-t-6">
                                    <button type="submit" class="btn3 flex-c-m size13 txt11 trans-0-4">
                                        预定
							        </button>
                                </div>
                            </form>
                        </div>

                        <div class="col-lg-5 offset-1 p-t-115">
                            <h4 class="txt9 m-b-38">
                                餐厅桌位 
					        </h4>

                            <div class="wrap-gallery-footer flex-w" style={{height: 222, overflow: 'overlay',position:'relative'}}>
                                {
                                    layout?this.getSeats():null
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default connect(mapStateToProps)(Booking)