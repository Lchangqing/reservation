import React from 'react';
import { connect } from 'dva';
class Header extends React.Component {
    render() {
        return (
            <div>
                <section className="home-slider owl-carousel owl-drag">

                    <div className="slider-item" style={{ backgroundImage: `url(images2/bg_1.jpg)` }}>
                        <div className="overlay"></div>
                        <div className="container">
                            <div className="row slider-text align-items-center justify-content-center text-center">
                                <div className="col-md-10 col-sm-12 ">
                                    <h1 className="m-b-200" >{this.props.name}</h1>
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