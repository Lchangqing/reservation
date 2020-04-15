import { Table, Popconfirm } from 'antd';
import { useDrag, useDrop } from 'react-dnd';
import { getAd } from '../../services/restaurant';
import React from 'react';

const type = 'DragbleBodyRow';

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
    const ref = React.useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,//必填。字符串，ES6符号，其中一个的数组或返回给定组件的其中一个的函数props。此放置目标将仅对由指定类型的拖动源产生的项目作出反应。
        collect: monitor => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
            };
        },
        drop: item => {//drop(item, monitor)： 可选的。当兼容项目放在目标上时调用。
            moveRow(item.index, index);
        },
        //hover(item, monitor)： 可选的。将项目悬停在组件上时调用
        //canDrop(item, monitor)： 可选的。使用它来指定放置目标是否能够接受该物品
    });
    const [, drag] = useDrag({
        item: {//必填。一个普通的JavaScript对象，描述了要拖动的数据。
            type, //必须设置，并且必须是字符串，ES6符号。只有注册为相同类型的放置目标才会对此项目做出反应。
            index
        },
        collect: monitor => ({// 可选的。收集功能。它应该返回道具的简单对象以返回注入到组件中。它接收两个参数，monitor和props。
            isDragging: monitor.isDragging(),
        }),
        //previewOptions： 可选的。描述拖动预览选项的普通JavaScript对象。
        //begin(monitor)： 可选的。拖动操作开始时触发。不需要返回任何内容，但是如果返回对象，它将覆盖item规范的默认属性。
        //end(item, monitor)： 可选的。当拖动停止时，end被调用。对于每个begin呼叫，end都会保证有一个相应的呼叫。您可以致电monitor.didDrop()检查是否由兼容的放置目标处理了放置。如果处理了该对象，并且放置目标通过从其方法返回一个普通对象来指定放置结果drop()，则它将作为monitor.getDropResult()。此方法是触发磁通动作的好地方。注意：如果在拖动时卸载了组件，则将component参数设置为null。
        //canDrag(monitor)： 可选的。使用它来指定当前是否允许拖动。如果要始终允许它，则只需忽略此方法。如果您想基于over的谓词禁用拖动，则指定它很方便props。注意：您不能monitor.canDrag()在此方法内调用。
        //isDragging(monitor)： 可选的。默认情况下，只有启动拖动操作的拖动源才被视为拖动。
    });
    // drop(drag(ref));
    drag(drop(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{ cursor: 'move', ...style }}
            {...restProps}
        />
    );
};



class DragSortingTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: '现优先级',
                dataIndex: 'npriority',
                key: 'npriority',
            },
            {
                title: '原优先级',
                dataIndex: 'opriority',
                key: 'opriority',
            },
            {
                title: '店铺',
                dataIndex: 'restaurant',
                key: 'restaurant',
            },
            {
                title: '店铺地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '编辑',
                dataIndex: 'edit',
                key: 'edit',
                render: (text, record) =>
                    1 ? (
                        <Popconfirm title="确定删除吗?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>删除</a>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            rspRestaurant: [],// 从后台拿到的店铺数据
            restaurants: null,// 从后台拿到的经过加工的店铺数据
            tmpRestaurants: []
        }
    }

    componentDidMount() {
        this.getOriginData()
    }

    getOriginData = () => {
        getAd().then(rsp => {
            if (rsp) {
                const rspRestaurant = rsp;
                rsp = rsp.sort((x, y) => x.priority - y.priority);
                rsp = rsp.map((item, index) => {
                    return { rid: item.id, key: index, restaurant: item.name, address: item.address, opriority: item.priority, npriority: item.priority };
                });
                const tmpRestaurants = JSON.parse(JSON.stringify(rsp));
                this.props.initRestaurants(tmpRestaurants);
                this.setState({ restaurants: rsp, tmpRestaurants, rspRestaurant, })
            }
        });
    }

    //在组件TableComponent 加入的方法
    components = {
        body: {
            row: DragableBodyRow,
        },
    };

    moveRow = (dragIndex, hoverIndex) => {
        let { tmpRestaurants } = this.state;
        const dragRow = tmpRestaurants[dragIndex];
        tmpRestaurants.splice(dragIndex, 1);
        tmpRestaurants.splice(hoverIndex, 0, dragRow);
        tmpRestaurants = tmpRestaurants.map((item, index) => {
            return { ...item, npriority: index + 1 }
        });
        console.log('tmpRestaurants', tmpRestaurants);
        this.setState({ tmpRestaurants });
        // this.setState(
        //     // update(this.state, {
        //     //     tmpRestaurants: {
        //     //         $splice: [
        //     //             [dragIndex, 1],// 将data的dragindex位置的元素删除
        //     //             [hoverIndex, 0, dragRow],// 在data的hoverindex出添加元素dragrow
        //     //         ],
        //     //     },
        //     // })
        //     this.updateOrder.bind(this, dragIndex, hoverIndex, dragRow)
        // );
    };

    updateOrder = (dragIndex, hoverIndex, dragRow, preState, props) => {
        let tmpRestaurants = preState.tmpRestaurants;
        tmpRestaurants.splice(dragIndex, 1);
        tmpRestaurants.splice(hoverIndex, 0, dragRow);
        tmpRestaurants = tmpRestaurants.map((item, index) => {
            return { ...item, npriority: index + 1 }
        });
        return { tmpRestaurants };
    }

    reset = () => {
        const { restaurants } = this.state;
        this.setState({ tmpRestaurants: JSON.parse(JSON.stringify(restaurants)) });
    }

    handleDelete = (key) => {
        let { tmpRestaurants } = this.state;
        const keys = tmpRestaurants.map(item => item.key);
        const index = keys.indexOf(key);
        let result = JSON.parse(JSON.stringify(tmpRestaurants));
        result.splice(index, 1);
        result = result.map((item, index) => {
            return { ...item, npriority: index + 1 };
        })
        this.setState({ tmpRestaurants: result });
        this.props.updateRestaurants({ tmpRestaurants: result });
    }

    addRe = async (tmpRestaurants) => {
        await this.setState({ tmpRestaurants });
    }

    updateRestaurants = (restaurants) => {
        const tmpRestaurants = JSON.parse(JSON.stringify(restaurants));
        this.setState({ tmpRestaurants, restaurants });
    }

    render() {
        const { tmpRestaurants } = this.state;
        return (
            <Table
                columns={this.columns}
                dataSource={tmpRestaurants}
                components={this.components}
                onRow={(record, index) => ({
                    index,
                    moveRow: this.moveRow,
                })}
            />
        );
    }
}
export default DragSortingTable;