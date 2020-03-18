import React from 'react';
import {connect} from 'dva';
class Introduction extends React.Component{
    render() {
        return(
            <section className="ftco-section-2">
            <div className="container d-flex">
              <div className="section-2-blocks-wrapper row">
                <div className="img col-sm-12 col-lg-6" style={{backgroundImage: `url(${this.props.img})`}}>
                </div>
                <div className="text col-lg-6 ">
                  <div className="text-inner align-self-start">
                    <span className="subheading">关于餐厅</span>
                    <h3 className="heading">为您奉上最美味的佳肴、最舒适的用餐环境</h3>
                    <p>{this.props.description}</p>
      
                    <p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
    }
}
export default connect()(Introduction)