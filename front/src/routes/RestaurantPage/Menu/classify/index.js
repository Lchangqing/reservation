import React from 'react';
import { connect } from 'dva';
import Item from './Item'
class Classify extends React.Component {
    constructor(props) {
        super(props);
        // this.setState({lMenus,rMenus});
        this.state = {
            rMenus: [],
            lMenus: []
        }
    }
    componentDidMount() {
        this.getMenus();
    }
    getMenus = () => {
        const { classify } = this.props;
        let { menus } = this.props;
        menus = menus.filter(i => i.classify === classify);
        const lMenus = menus.slice(0, Math.ceil(menus.length / 2));
        const rMenus = menus.slice(Math.ceil(menus.length / 2));
        this.setState({ lMenus, rMenus });
    }
    updateMenu = async () => {
        await this.props.updateMenu();
        this.getMenus();
    }
    setMenu(menu) {
        if (!menu.length) {
            return null;
        }
        return (
            <div className="col-lg-6">
                {menu.map((item, index) =>
                    <Item key={`dish-${index}`} food={item} rid={this.props.rid} updateMenu={this.updateMenu} />
                )}
            </div>
        )
    }
    render() {
        const { lMenus, rMenus } = this.state;
        return (
            <div className="row">
                {this.setMenu(lMenus)}
                {this.setMenu(rMenus)}
            </div>
        )
    }
}
export default connect()(Classify)