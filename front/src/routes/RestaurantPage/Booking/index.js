/* eslint-disable radix */
import { connect } from 'dva';
import React from 'react';
import { searchRePageGetLayout, userGetUserOrders } from '../../../models/actionType';
import { reserve } from '../../../services/restaurant';
import cookie from 'react-cookies';
import { message, Icon, Modal } from 'antd';
import Order from './order';
import './main.css';
import './util.css';
import EditModal from './EditModal';
const { confirm } = Modal;
function mapStateToProps(state) {
    return { searchRePage: state.searchRePage, user: state.user };
}
class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            layout: null,
            seats: [],//根据noTime拿到的所有餐桌（01表示）[0,1.1,0..]
            tables: [],// 实际用来展示
            windows: [],
            smoking: [],
            time: [],
            noTime: [],//中午和晚上都不可被选择的餐桌
            random: [],//表示所有餐桌，数组形式,[1,2....]
            number: null,//选择的餐桌号
            rest: 0, //rest为0的时候代表用户没有选择餐桌
            show: false,//是否显示订单
            modalShow: false
        }
        this.tablesOnchang = this.tablesOnchang.bind(this);
        this.seatsOnchange = this.seatsOnchange.bind(this);
        this.areaOnchange = this.areaOnchange.bind(this);
        this.timeOnchang = this.timeOnchang.bind(this);
        this.clickSeats = this.clickSeats.bind(this);
        this.handleReserve = this.handleReserve.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.setLayout();
    }

    unsafe_componentWillReceiveProps(nextProps) {
        this.initLayout(nextProps);
    }

    setLayout = async () => {
        await this.getLayout();
        this.initLayout();
    }

    async getLayout() {
        await this.props.dispatch({
            type: searchRePageGetLayout,
            payload: { id: this.props.id }
        })

    }

    initLayout = (nextProps) => {
        let seats = [];
        let random = [];
        const { layout } = nextProps?nextProps.searchRePage:this.props.searchRePage;
        if (!layout) {
            return;
        }
        // 中午和晚上都已经被预定的餐桌
        const noTime = layout.noon.filter(i => layout.night.indexOf(i) > -1);
        // seats：根据noTime拿到的所有餐桌
        for (let i = 1; i <= layout.tables; i++) {
            seats.push(noTime.indexOf(i) > -1 ? 0 : 1)
            random.push(i)
        }
        this.setState({ layout, seats, tables: random, windows: random, smoking: random, time: noTime, noTime, random, rest: 0 });
    }

    getSeats() {
        const { tables, windows, smoking, time } = this.state;
        let { seats } = this.state;
        // 查看条件，对seats的01进行重编
        seats = seats.map((i, index) => {
            if (tables.indexOf(index + 1) > -1 && windows.indexOf(index + 1) > -1 && smoking.indexOf(index + 1) > -1 && time.indexOf(index + 1) === -1) {
                return 1
            } else {
                return 0
            }
        })
        return seats.map((i, index) => (
            <span class="item-gallery-footer wrap-pic-w" data-lightbox="gallery-footer" rest={i} number={index + 1} onClick={this.clickSeats}>
                {index + 1}号桌
                {!i ? <span className='cq-masking' /> : null}
            </span>
        ))
    }
    clickSeats(e) {
        const rest = parseInt(e.target.getAttribute('rest'));
        const number = parseInt(e.target.getAttribute('number'));
        console.log('rest', rest);
        if (rest) {
            this.setState({ number, rest })
        }
        this.setState({ rest })
    }
    tablesOnchang(e) {
        const { layout, number, random } = this.state;
        const tables = e.target.value;
        if (tables === '') {
            this.setState({ tables: random })
        } else if (tables === 's') {
            if (number && layout.stables.indexOf(number) === -1) {
                this.setState({ tables: layout.stables, rest: 0 })
            }
            this.setState({ tables: layout.stables })
        } else if (tables === 'm') {
            if (number && layout.mtables.indexOf(number) === -1) {
                this.setState({ tables: layout.mtables, rest: 0 })
            }
            this.setState({ tables: layout.mtables })
        } else if (tables === 'l') {
            if (number && layout.ltables.indexOf(number) === -1) {
                this.setState({ tables: layout.ltables, rest: 0 })
            }
            this.setState({ tables: layout.ltables })
        }
    }
    seatsOnchange(e) {
        const { layout, number, random } = this.state;
        const seats_ = e.target.value;
        if (seats_ === '') {
            this.setState({ windows: random })
        } else if (seats_ === 'nw') {
            if (number && layout.no_window.indexOf(number) === -1) {
                this.setState({ windows: layout.no_window, rest: 0 })
            }
            this.setState({ windows: layout.no_window })
        } else if (seats_ === 'w') {
            if (number && layout.window.indexOf(number) === -1) {
                this.setState({ windows: layout.window, rest: 0 })
            }
            this.setState({ windows: layout.window })
        }
    }
    areaOnchange(e) {
        const { layout, number, random } = this.state;
        const area = e.target.value;
        if (area === '') {
            this.setState({ smoking: random })
        } else if (area === 'ns') {
            if (number && layout.no_smoking.indexOf(number) === -1) {
                this.setState({ smoking: layout.no_smoking, rest: 0 })
            }
            this.setState({ smoking: layout.no_smoking })
        } else if (area === 's') {
            if (number && layout.smoking.indexOf(number) === -1) {
                this.setState({ smoking: layout.smoking, rest: 0 })
            }
            this.setState({ smoking: layout.smoking })
        }
    }
    timeOnchang(e) {
        const { layout, number, noTime } = this.state;
        const time = e.target.value;
        if (time === '') {
            this.setState({ time: noTime })
        } else if (time === 'no') {
            if (number && layout.noon.indexOf(number) > -1) {
                this.setState({ time: layout.noon, rest: 0 })
            }
            this.setState({ time: layout.noon })
        } else if (time === 'ni') {
            if (number && layout.night.indexOf(number) > -1) {
                this.setState({ time: layout.night, rest: 0 })
            }
            this.setState({ time: layout.night })
        }
    }
    handleReserve() {
        const { rest, number, layout } = this.state;
        const inputName = this.inputName.value;
        const inputNumber = this.inputNumber.value;
        console.log('inputName', inputName, inputNumber)
        if (!cookie.load('user')) {
            message.warning('请先登录账号', 2);
            return;
        }
        if (!rest) {
            alert('请选择您需要预定的餐桌');
            return;
        }
        if (!inputName || !inputNumber) {
            alert('请将信息填写完整');
            return;
        }
        if (!(/^1[3456789]\d{9}$/.test(inputNumber))) {
            alert('手机号输入有误，请重新输入');
            return;
        }
        confirm({
            title: '确认提交订单吗?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: async () => {
                const result = await reserve({ number, layout, name: inputName, phone: inputNumber, restaurant_name: this.props.restaurant_name, user: cookie.load('user'), rid: this.props.id })
                if (result) {
                    this.setState({ order: result, show: true })
                    this.setLayout();
                    this.getOrders();
                }
            },
            onCancel() {
                return;
            },
        });
    }

    getOrders = async () => {
        await this.props.dispatch({
            type: userGetUserOrders,
            payload: { uid: cookie.load('user').id }
        })
    }

    handleCancel() {
        this.setState({ show: false, modalShow: false });
    }
    updateVal = () => {
        this.setLayout();
    }
    render() {
        const { layout, number, rest, seats, order, modalShow, show } = this.state;
        return (
            <section class="section-booking bg1-pattern">
                <div class="container">
                    {modalShow ? <EditModal show={modalShow} handleCancel={this.handleCancel} updateVal={this.updateVal} layout={layout} /> : null}
                    {show ? <Order detail={order} show={show} handleCancel={this.handleCancel} /> : null}
                    <div class="row">
                        <div class="col-lg-6 p-b-30">
                            <div class="t-center">
                                <h3 class="tit9 t-center m-b-35 m-t-40">
                                    餐桌预定
						        </h3>
                            </div>

                            <div class="wrap-form-booking">
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
                                            <input ref={input => this.inputName = input} class="bo-rad-10 sizefull txt10 p-l-20" type="text" name="name" placeholder="姓名" />
                                        </div>

                                        <span class="txt9">
                                            手机号
								        </span>

                                        <div class="wrap-inputphone size12 bo2 bo-rad-10 m-t-3 m-b-23">
                                            <input ref={input => this.inputNumber = input} class="bo-rad-10 sizefull txt10 p-l-20" type="text" name="phone" placeholder="手机号" />
                                        </div>
                                    </div>
                                </div>

                                <div class="wrap-btn-booking flex-c-m m-t-6">
                                    <button onClick={this.handleReserve} class="btn3 flex-c-m size13 txt11 trans-0-4">
                                        预定
							        </button>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-5 offset-1 p-t-115">
                            <a onClick={() => this.setState({ modalShow: true })} style={{ fontSize: '2em', position: 'absolute', right: '1em', top: '1em' }}>
                                <Icon type="highlight" />
                            </a>
                            <h4 class="txt9 m-b-38">
                                餐厅桌位{rest && seats[number - 1] ? `:  您已选中${number}号餐桌` : null}
                            </h4>

                            <div class="wrap-gallery-footer flex-w" style={{ height: 222, overflow: 'overlay', position: 'relative' }}>
                                {
                                    layout ? this.getSeats() : null
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