import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import Sider from './Sider';
import { MenuUnfoldOutlined, MenuFoldOutlined, } from '@ant-design/icons';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './index.less';
const { Content, Header } = Layout;
class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
        };
    }

    toggle = () => {
        this.child.toggle();
        console.log('this.child', this.child, this.child.toggle())
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <Layout style={{ height: '100%', overflow: 'hidden' }} id='components-layout-demo-custom-trigger'>
                <Sider ref={(child) => { this.child = child; }} />
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {this.state.collapsed ? <MenuUnfoldOutlined className='trigger' onClick={this.toggle} /> : <MenuFoldOutlined className='trigger' onClick={this.toggle} />}
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            overflow: 'inherit'
                        }}
                    >
                        <DndProvider backend={HTML5Backend}>
                            {this.props.children}
                        </DndProvider>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default connect()(MainPage);