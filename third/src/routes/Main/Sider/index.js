import React from "react";
import { Link } from "dva/router";
import menus from "../../../configs/menus";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
const { SubMenu } = Menu;

const ProcudeMenus = menus => {
    return menus.map((item, index) => {
        if (item.hasOwnProperty('children') && item.children.length) {  //子菜单
            return (
                <SubMenu
                    key={`submenu-${index}`}
                    title={
                        <span>
                            {item.icon}
                            <span>{item.title}</span>
                        </span>
                    }
                >
                    {item.children.map((element, index) => (
                        <Menu.Item key={`submenu-item-${index}`}>
                            <span>{element.title}</span>
                            <Link to={element.path} />
                        </Menu.Item>
                    ))}
                </SubMenu>
            );
        }
        else {
            return (
                <Menu.Item key={`menu-${index}`}>
                    {item.icon}
                    <span>{item.title}</span>
                    <Link to={item.path} />
                </Menu.Item>
            )
        }
    })
};

export default class SiderMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Sider width={'20vw'} trigger={null} collapsible collapsed={this.state.collapsed} >
                <div className="logo" >
                    <h4 style={{ color: '#f0f2f5', textAlign: 'center', lineHeight: '32px' }}></h4>
                </div>
                <Menu mode="inline" theme="dark" >
                    {ProcudeMenus(menus)}
                </Menu>
            </Sider>
        );
    }
};
