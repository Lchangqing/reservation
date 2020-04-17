import React from 'react';
import { connect } from 'dva';
import { searchRePageGetMenus } from '../../../models/actionType';
import { Icon } from 'antd';
import Classify from './Classify';
import AddModal from './AddModal';
import cookie from 'react-cookies';
function mapStateToProps(state) {
    return { searchRePage: state.searchRePage, user: state.user };
}
class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: [],
            show: false,
            classify: []
        }
    }

    componentDidMount() {
        this.getMenus();
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

    getMenus = async () => {
        await this.props.dispatch({
            type: searchRePageGetMenus,
            payload: { id: this.props.id }
        })
        const { menus } = this.props.searchRePage;
        let classify = [];
        menus.forEach(i => {
            classify.push(i.classify)
        })
        classify = Array.from(new Set(classify));
        this.setState({ menus, classify });
    }
    setMenus() {
        const { menus, classify } = this.state;
        if (!classify.length) {
            return;
        }
        return classify.map((i, index) => (
            <div key={`menus-${index}`} className={`tab-pane fade ${index === 0 ? `show active` : ``}`} id={`v-pills-${index}`} role="tabpanel" aria-labelledby={`v-pills-${index}-tab`}>
                <Classify key={`Classify-${index}`} menus={menus} classify={i} rid={this.props.id} updateMenu={this.getMenus} />
            </div>
        ))
    }
    getNavs() {
        const { classify } = this.state;
        if (!classify.length) {
            return;
        }
        return classify.map((i, index) => (
            <a key={`nav-${index}`} className={`nav-link py-3 px-4 ${index === 0 ? `show active` : ``}`} id={`v-pills-${index}-tab`} data-toggle="pill" href={`#v-pills-${index}`} role="tab" aria-controls={`v-pills-${index}`} aria-selected={index === 0 ? `true` : `false`}><span className="flaticon-meat"></span> {i}</a>
        ))
    }


    showModal = () => {
        this.setState({ show: true });
    }
    handleCancel = () => {
        this.setState({ show: false });
    }
    updateVal = (val) => {
        this.setState({ ...val });
    }
    render() {
        const { show, showEdit } = this.state;
        return (
            <section className="ftco-section bg-light">
                <div className="container">
                    <AddModal rid={this.props.id} handleCancel={this.handleCancel} show={show} updateMenu={this.getMenus} />
                    <div className="row justify-content-center mb-5 pb-5">
                        <div className="col-md-7 text-center heading-section ">
                            <span className="subheading">Our Menu</span>
                            <h2>美味佳肴等待您的挖掘</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 dish-menu">
                            <div className="nav nav-pills justify-content-center " id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                {this.getNavs()}
                                {
                                    showEdit ?
                                        <a style={{ fontSize: '2em', position: 'absolute', right: '1em', top: '1em' ,zIndex:10000}} onClick={() => this.showModal()}>
                                            <Icon type="plus" />
                                        </a>
                                        : null
                                }

                            </div>
                            <div className="tab-content py-5" id="v-pills-tabContent">
                                {this.setMenus()}
                                <div className="col-sm-12 pt-4 text-center ">
                                    <p>Even the all-powerful Pointing has no control about the blind texts it is an almost</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
export default connect(mapStateToProps)(Menu)