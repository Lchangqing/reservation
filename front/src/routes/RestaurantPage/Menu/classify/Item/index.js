import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Popover, Modal, message } from 'antd';
import { deleteDish } from '../../../../../services/restaurant'
import EditModal from './EditModal';
const { confirm } = Modal;
class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.updateVal = this.updateVal.bind(this);
    }
    handleCancel() {
        this.setState({ show: false });
    }
    updateVal(val) {
        this.setState({ ...val });
    }

    deleteItem = () => {
        const { id } = this.props.food;
        deleteDish({ id }).then(rsp => {
            if (rsp) {
                message.success('删除成功');
                this.props.updateMenu();
            }
        })
    }
    handleDelete = () => {
        confirm({
            title: '确认删除该菜品?',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                this.deleteItem();
            },
            onCancel() {
                return;
            },
        });
    }
    editItem = () => {
        this.setState({ show: true });
    }
    getItem = () => {
        const { food } = this.props;
        const imgUrl = food.img.includes('dishesImg') ? food.img : `images/${food.img}.jpg`;
        return (
            <Link to={{ pathname: "/DetailPage", state: { ...food, img: imgUrl }, rid: this.props.id }}>
                <div className="menus d-flex ">
                    <div className="menu-img" style={{ backgroundImage: `url(${imgUrl})` }}></div>
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
    render() {
        const { show } = this.state;
        const content = (
            <div>
                <a onClick={() => this.handleDelete()}>删除该项</a>
                <hr />
                <a onClick={() => this.editItem()}>编辑该项</a>
            </div>
        );
        return (
            1 ?
                (
                    <div>
                        <EditModal key={this.props.key} handleCancel={this.handleCancel} show={show} details={this.props.food} updateMenu={this.props.updateMenu} />
                        <Popover content={content}>
                            {this.getItem()}
                        </Popover>
                    </div>
                )
                :
                this.getItem()
        )
    }
}
export default connect()(Item)