import React from 'react';
import {connect} from 'dva';
class Header extends React.Component{
    render(){
        return(
           <div>
                <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
                    <div class="container">
                        <a class="navbar-brand" href="index.html">Tasty</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="oi oi-menu"></span> Menu
                        </button>
                
                        <div class="collapse navbar-collapse" id="ftco-nav">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item active"><a href="index.html" class="nav-link">Home</a></li>
                            <li class="nav-item"><a href="menu.html" class="nav-link">Menu</a></li>
                            <li class="nav-item"><a href="specialties.html" class="nav-link">Specialties</a></li>
                            <li class="nav-item"><a href="reservation.html" class="nav-link">Reservation</a></li>
                            <li class="nav-item"><a href="blog.html" class="nav-link">Blog</a></li>
                            <li class="nav-item"><a href="about.html" class="nav-link">About</a></li>
                            <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
                        </ul>
                        </div>
                    </div>
                </nav>
                <section class="home-slider owl-carousel">
                    <div class="slider-item" style={{backgroundImage: "url(images2/bg_1.jpg)"}}>
                        <div class="overlay"></div>
                        <div class="container">
                        <div class="row slider-text align-items-center justify-content-center text-center">
                            <div class="col-md-10 col-sm-12 ftco-animate">
                            <h1 class="mb-3">Book a table for yourself at a time convenient for you</h1>
                            <p><a href="reservation.html" class="btn btn-primary btn-outline-white px-5 py-3">Book a table</a></p>
                            </div>
                        </div>
                        </div>
                    </div>
                
                    <div class="slider-item" style={{backgroundImage: "url(images2/bg_2.jpg)"}}>
                        <div class="overlay"></div>
                        <div class="container">
                        <div class="row slider-text align-items-center justify-content-center text-center">
                            <div class="col-md-10 col-sm-12 ftco-animate">
                            <h1 class="mb-3">Tasty &amp; Delicious Food</h1>
                            <p><a href="reservation.html" class="btn btn-primary btn-outline-white px-5 py-3">Book a table</a></p>
                            </div>
                        </div>
                        </div>
                    </div>
                
                    <div class="slider-item" style={{backgroundImage: "url(images2/bg_3.jpg)"}}>
                        <div class="overlay"></div>
                        <div class="container">
                        <div class="row slider-text align-items-center justify-content-center text-center">
                            <div class="col-md-10 col-sm-12 ftco-animate">
                            <h1 class="mb-3">Book a table for yourself at a time convenient for you</h1>
                            <p><a href="reservation.html" class="btn btn-primary btn-outline-white px-5 py-3">Book a table</a></p>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
                <div class="ftco-section-reservation">
                    <div class="container">
                        <div class="row">
                        <div class="col-md-12 reservation pt-5 px-5">
                            <div class="block-17">
                            <form action="" method="post" class="d-block d-lg-flex">
                                <div class="fields d-block d-lg-flex">

                                <div class="textfield-name one-third"><input type="text" class="form-control" placeholder="Name"/></div>

                                <div class="textfield-phone one-third"><input type="text" class="form-control" placeholder="Phone"/></div>

                                <div class="book-date one-third"><input type="text" id="book_date" class="form-control" placeholder="M/D/YYYY"/></div>

                                <div class="book-time one-third">
                                    <input type="text" id="book_time" class="form-control" placeholder="Time"/>
                                </div>

                                <div class="select-wrap one-third">
                                    <div class="icon"><span class="ion-ios-arrow-down"></span></div>
                                    <select name="" id="" class="form-control">
                                    <option value="">Person</option>
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                    <option value="">4+</option>
                                    </select>
                                </div>
                                </div>
                                <input type="submit" class="search-submit btn btn-primary" value="Book a table"/>  
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
            </div> 
        )
    }
}
export default connect()(Header)