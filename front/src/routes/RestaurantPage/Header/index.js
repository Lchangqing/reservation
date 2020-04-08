import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import EditModal from './EditModal';
import cookie from 'react-cookies';
function mapStateToProps(state) {
    return { user: state.user };
}
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
    componentDidMount() {
        this.getEdit();
    }
    componentDidUpdate() {
        this.getEdit();
    }
    getEdit = () => {
        const user = cookie.load('user');
        const { showEdit } = this.state;
        if (user && user.rid && user.rid === this.props.rid && !showEdit) {
            this.setState({ showEdit: true });
        } else if (!user && showEdit) {
            this.setState({ showEdit: false });
        }
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
        const { show, name, showEdit } = this.state;
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
                                        {
                                            showEdit ?
                                                <a style={{ fontSize: '0.5em' }} onClick={() => this.showModal()} > <Icon type="highlight" /></a>
                                                : null
                                        }
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
export default connect(mapStateToProps)(Header)