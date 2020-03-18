import React from 'react';
import {connect} from 'dva';
class Header extends React.Component{
    componentDidMount(){
        console.log('this.props',this.props);
    }
    render(){
        return(
           <div>
                <nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div className="container">
                        <a className="navbar-brand" href="index.html">Tasty</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="oi oi-menu"></span> Menu
                        </button>
                
                        <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active"><a href="index.html" className="nav-link">Home</a></li>
                            <li className="nav-item"><a href="menu.html" className="nav-link">Menu</a></li>
                            <li className="nav-item"><a href="specialties.html" className="nav-link">Specialties</a></li>
                            <li className="nav-item"><a href="reservation.html" className="nav-link">Reservation</a></li>
                            <li className="nav-item"><a href="blog.html" className="nav-link">Blog</a></li>
                            <li className="nav-item"><a href="about.html" className="nav-link">About</a></li>
                            <li className="nav-item"><a href="contact.html" className="nav-link">Contact</a></li>
                        </ul>
                        </div>
                    </div>
                </nav>
                <section className="home-slider owl-carousel owl-drag">
                
                    <div className="slider-item" style={{backgroundImage: `url(images2/bg_1.jpg)`}}>
                        <div className="overlay"></div>
                        <div className="container">
                        <div className="row slider-text align-items-center justify-content-center text-center">
                            <div className="col-md-10 col-sm-12 ">
                            <h1 className="m-b-200">{this.props.name}</h1>
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