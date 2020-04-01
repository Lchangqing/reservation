import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import EditModal from './EditModal';
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: this.props.name || ''
        }
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateName = this.updateName.bind(this);
    }
    showModal() {
        this.setState({ show: true });
    }
    handleCancel() {
        this.setState({ show: false });
    }
    updateName(name) {
        this.setState({ name });
    }
    render() {
        const { show, name } = this.state;
        const { rid } = this.props;
        return (
            <div>
                <section className="home-slider owl-carousel owl-drag">
                    <EditModal rid={rid} name={name} show={show} handleCancel={this.handleCancel} updateName={this.updateName} />
                    <div className="slider-item" style={{ backgroundImage: `url(images2/bg_1.jpg)` }}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text align-items-center justify-content-center text-center">
                                <div className="col-md-10 col-sm-12 ">
                                    <h1 className="m-b-200" >
                                        {name || ''}
                                        <a style={{ fontSize: '0.5em' }} onClick={() => this.showModal()} > <Icon type="highlight" /></a>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
export default connect()(Header)