import React from 'react';
import { connect } from 'dva';
import DragArea from './DragArea';
import AddModule from './AddModule';
import { Button, message } from 'antd';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { updataAds } from '../../services/restaurant';
// import { DragAndDropHOC } from './DragAndDropHOC ';
import { Spin } from 'antd';
import './index.css';
class AdPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            tmpRestaurants: [],
            addModalShow: false,
            loading: true,
            editLoading: false
        }
    }

    initRestaurants = (restaurants) => {
        this.setState({ restaurants, tmpRestaurants: restaurants, loading: false });
    }

    reset = async () => {
        const { restaurants } = this.state;
        const tmpRestaurants = JSON.parse(JSON.stringify(restaurants));
        this.dragArea.reset();
        await this.setState({ tmpRestaurants });
        this.addModal.getRestaurants();
    }

    handleCancel = () => {
        this.setState({ addModalShow: false });
    }

    showAddModal = () => {
        this.addModal.getRestaurants();
        this.setState({ addModalShow: true });
    }

    addRe = async (tmpRestaurants) => {
        await this.dragArea.addRe(tmpRestaurants);
        this.setState({ tmpRestaurants, addModalShow: false });
    }

    updateRestaurants = (result) => {
        this.setState({ ...result });
    }

    submitEdit = async () => {
        let { tmpRestaurants } = this.dragArea.state;
        await this.setState({ editLoading: true });
        updataAds(tmpRestaurants).then(async rsp => {
            console.log('updataAds', rsp);
            if (rsp) {
                tmpRestaurants = tmpRestaurants.map((item) => {
                    return { ...item, opriority: item.npriority };
                })
                let restaurants = JSON.parse(JSON.stringify(tmpRestaurants));
                await this.setState({ restaurants, tmpRestaurants });
                await this.addModal.getRestaurants();
                await this.dragArea.updateRestaurants(restaurants);
                await this.setState({ editLoading: false });
                message.success('选择成功');
            }
        })
    }

    render() {
        const { addModalShow, restaurants, tmpRestaurants, editLoading } = this.state;
        return (
            <Spin tip="数据加载中..." size="large" spinning={this.state.loading}>
                <div className="ad-buttons">
                    <Button size="large" type="primary" icon={<PlusOutlined />} onClick={this.showAddModal}>增加店铺</Button>
                    <Button size="large" type="primary" icon={<ReloadOutlined />} onClick={this.reset}>重置</Button>
                    <Button size="large" type="danger" loading={editLoading} onClick={this.submitEdit}>确认修改</Button>
                </div>
                <AddModule ref={addModal => { this.addModal = addModal }} show={addModalShow} handleCancel={this.handleCancel} restaurants={restaurants} tmpRestaurants={tmpRestaurants} addRe={this.addRe} />
                <DragArea ref={dragArea => { this.dragArea = dragArea }} initRestaurants={this.initRestaurants} updateRestaurants={this.updateRestaurants} />
            </Spin>

        );
    }
}
export default AdPage;