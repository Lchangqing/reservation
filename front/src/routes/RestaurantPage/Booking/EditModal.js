/* eslint-disable radix */
import { Modal, InputNumber, Form, Button, Row, Col, Radio, message } from 'antd';
import { updateLayout } from '../../../services/restaurant';
import './style.css';
import React from 'react';
const options1 = [
    { label: '小', value: 's' },
    { label: '中', value: 'm' },
    { label: '大', value: 'l' },
];
const options2 = [
    { label: '临窗', value: 'w' },
    { label: '不临窗', value: 'nw' },
];
const options3 = [
    { label: '无烟', value: 'ns' },
    { label: '闹区', value: 's' },
];
class EditModal extends React.Component {
    constructor(props) {
        super(props);
        const values = this.getCondition()
        const { stables, mtables, ltables, window, no_window, smoking, no_smoking, tables } = this.props.layout;
        this.state = {
            value1: '',
            value2: '',
            value3: '',
            number: 0,
            seats: values.seats,
            conditon: values.conditon,
            stables,
            ltables,
            mtables,
            smoking,
            window,
            no_window,
            no_smoking,
            tableNumber: tables
        }
    }

    // 拿到每个座位的环境条件{1:[],2:[],3:[]......}
    getCondition() {
        const { stables, mtables, window, smoking, tables } = this.props.layout;
        let seats = [];
        let conditon = {};
        for (let i = 1; i <= tables; i++) {
            seats.push(i)
        }
        seats.forEach(item => {
            conditon[item] = [];
            if (stables.indexOf(item) > -1) {
                conditon[item][0] = 's';
            } else if (mtables.indexOf(item) > -1) {
                conditon[item][0] = 'm';
            } else {
                conditon[item][0] = 'l';
            }
            if (window.indexOf(item) > -1) {
                conditon[item][1] = 'w';
            } else {
                conditon[item][1] = 'nw';
            }
            if (smoking.indexOf(item) > -1) {
                conditon[item][2] = 's';
            } else {
                conditon[item][2] = 'ns';
            }
        })
        return { seats, conditon };
    }

    getSeats = () => {
        const { number, seats } = this.state;
        return seats.map((i) => (
            <span class="item-gallery-footer wrap-pic-w" data-lightbox="gallery-footer" number={i} onClick={this.clickSeats} key={i}>
                {i}号桌
                {i === number ? <span className='click-masking' /> : null}
            </span>
        ))
    }

    clickSeats = (e) => {
        const { conditon } = this.state;
        const number = parseInt(e.target.getAttribute('number'));
        this.setState({ number, value1: conditon[number][0], value2: conditon[number][1], value3: conditon[number][2] });
    }
    onChange1 = e => {
        const { number, conditon } = this.state;
        if (conditon[number][0] !== e.target.value) {
            conditon[number][0] = e.target.value
        }
        console.log('radio1 checked', e.target.value);
        this.setState({ conditon, value1: e.target.value });
    };

    onChange2 = e => {
        const { number, conditon } = this.state;
        if (conditon[number][1] !== e.target.value) {
            conditon[number][1] = e.target.value
        }
        console.log('radio2 checked', e.target.value);
        this.setState({ conditon, value2: e.target.value });
    };

    onChange3 = e => {
        const { number, conditon } = this.state;
        if (conditon[number][2] !== e.target.value) {
            conditon[number][2] = e.target.value
        }
        console.log('radio3 checked', e.target.value);
        this.setState({ conditon, value3: e.target.value });
    };
    changTables = () => {
        const { tableNumber, number } = this.state;
        let { conditon, seats } = this.state;
        const currentNumber = this.tableNumber.inputNumberRef.state.value;
        let diff = 0;
        if (!currentNumber || currentNumber === tableNumber) {
            return;
        }
        if (currentNumber < tableNumber) {
            diff = tableNumber - currentNumber;
            while (diff) {// 删除多出来的餐桌
                delete conditon[tableNumber - diff + 1];
                seats.pop();
                --diff;
            }
            // 判断之前选中的餐桌号是否超出如今已有的餐桌数，如果是就把选中状态取消
            if (number > currentNumber) {
                this.setState({ conditon, tableNumber: currentNumber, seats, number: 0, value1: '', value2: '', value3: '' });
            } else {
                this.setState({ conditon, tableNumber: currentNumber, seats })
            }

        } else {
            diff = currentNumber - tableNumber;
            let i = 1;
            while (diff) {
                conditon[tableNumber + i] = [];
                conditon[tableNumber + i][0] = 's';
                conditon[tableNumber + i][1] = 'nw';
                conditon[tableNumber + i][2] = 'ns';
                seats.push(tableNumber + i);
                ++i;
                --diff;
            }
            this.setState({ conditon, tableNumber: currentNumber, seats })
        }
    }
    handleOk = () => {
        const { conditon, tableNumber } = this.state;
        const { id } = this.props.layout;
        let stables = [], ltables = [], mtables = [], smoking = [], window = [], no_window = [], no_smoking = [];
        Object.keys(conditon).forEach(item => {
            if (conditon[item][0] === 's') {
                stables.push(item)
            } else if (conditon[item][0] === 'm') {
                mtables.push(item)
            } else {
                ltables.push(item)
            }
            if (conditon[item][1] === 'w') {
                window.push(item)
            } else {
                no_window.push(item)
            }
            if (conditon[item][2] === 's') {
                smoking.push(item)
            } else {
                no_smoking.push(item)
            }
        })
        stables = stables.join(',');
        ltables = ltables.join(',');
        mtables = mtables.join(',');
        smoking = smoking.join(',');
        window = window.join(',');
        no_window = no_window.join(',');
        no_smoking = no_smoking.join(',');
        updateLayout({ id, layout: { stables, ltables, mtables, smoking, window, no_window, no_smoking, tables: tableNumber } }).then(rsp => {
            if (rsp) {
                message.success('修改成功');
                this.props.updateVal();
            }
        })
    }
    render() {
        const { layout } = this.props;
        return (
            <Modal
                visible={this.props.show}
                title="订餐吧"
                onCancel={this.props.handleCancel}
                width={800}
                footer={[
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        确认修改
                    </Button>
                ]}
            >
                <div class="row">
                    <div class="col-lg-6 p-b-30">
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                            <Col span={6}>
                                餐桌数
                            </Col>
                            <Col span={6}>
                                <InputNumber ref={tableNumber => this.tableNumber = tableNumber} min={1} max={500} defaultValue={layout.tables} />
                            </Col>
                            <Col span={4}>
                                <Button onClick={this.changTables}>
                                    确认
                                </Button>
                            </Col>
                        </Row>
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                            <Col span={6}>
                                餐桌大小
                            </Col>
                            <Col span={18}>
                                <Radio.Group options={options1} onChange={this.onChange1} value={this.state.value1} />
                            </Col>
                        </Row>
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                            <Col span={6}>
                                是否临窗
                            </Col>
                            <Col span={18}>
                                <Radio.Group options={options2} onChange={this.onChange2} value={this.state.value2} />
                            </Col>
                        </Row>
                        <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                            <Col span={6}>
                                环境
                            </Col>
                            <Col span={18}>
                                <Radio.Group
                                    options={options3}
                                    onChange={this.onChange3}
                                    value={this.state.value3}
                                />
                            </Col>
                        </Row>
                    </div>

                    <div class="col-lg-6">
                        <div class="wrap-gallery-footer flex-w" style={{ height: 222, overflow: 'overlay', position: 'relative' }}>
                            {
                                layout ? this.getSeats() : null
                            }
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}
export default Form.create({ name: ' EditModal' })(EditModal);