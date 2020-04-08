import React from 'react';
import { connect } from 'dva';
import { Icon } from 'antd';
import DescriptionModal from './DescriptionModal';
import ImgModal from './ImgModal';
import cookie from 'react-cookies';
function mapStateToProps(state) {
  return { user: state.user };
}
class Introduction extends React.Component {
  constructor(props) {
    super(props);
    const { additional, description, img } = this.props.ad;
    this.state = {
      show: false,
      imgShow: false,
      additional,
      description,
      img
    }
    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.updateVal = this.updateVal.bind(this);
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
    this.setState({ show: false, imgShow: false });
  }
  updateVal(val) {
    this.setState({ ...val });
  }
  render() {
    const { description, img, additional, show, imgShow, showEdit } = this.state;
    return (
      <section className="ftco-section-2">
        <div className="container d-flex">
          <div className="section-2-blocks-wrapper row" style={{ width: '100%' }}>
            <DescriptionModal handleCancel={this.handleCancel} updateVal={this.updateVal} ad={this.props.ad} show={show} />
            <ImgModal handleCancel={this.handleCancel} show={imgShow} updateUrl={this.updateVal} ad={this.props.ad} />
            <div className="img col-sm-12 col-lg-6" style={{ backgroundImage: `url(${img})` }}>
              {
                showEdit ?
                  <a style={{ fontSize: '2em', position: 'absolute', right: '1em', top: '1em' }} onClick={() => this.setState({ imgShow: true })}>
                    <Icon type="form" />
                  </a>
                  : null
              }
            </div>
            <div className="text col-lg-6 ">
              {
                showEdit ?
                  <a style={{ fontSize: '2em', position: 'absolute', right: '1em', top: '1em' }} onClick={() => this.showModal()}>
                    <Icon type="highlight" />
                  </a>
                  : null
              }
              <div className="text-inner align-self-start">
                <span className="subheading">关于餐厅</span>
                <h3 className="heading">为您奉上最美味的佳肴、最舒适的用餐环境</h3>
                <p>{description}</p>

                <p>{additional || 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default connect(mapStateToProps)(Introduction)