/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import {connect} from 'dva';
import './style.css';
class DetailPage extends React.Component{
    render(){
        return(
            <div className="site-wrap">

                <div className="site-mobile-menu">
                <div className="site-mobile-menu-header">
                    <div className="site-mobile-menu-close mt-3">
                    <span className="icon-close2 js-menu-toggle"></span>
                    </div>
                </div>
                <div className="site-mobile-menu-body"></div>
                </div>
                
                <header className="site-navbar" role="banner">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="site-logo">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <a href="/" className="text-black h2 mb-0"><i className="icon-arrow-left"></i></a>
                            </div>
                        </div>
                    </div>
                </header>
                
                <section className="site-section py-lg">
                <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="site-logo">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    <a href="/" className="text-black h2 mb-0"><i className="icon-arrow-left"></i></a>
                            </div>
                        </div>
                    </div>
                <div className="container">
                    
                    <div className="row blog-entries element-animate">
            
                    <div className="col-md-12 col-lg-8 main-content">
                        
                        <div className="post-content-body">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium nam quas inventore, ut iure iste modi eos adipisci ad ea itaque labore earum autem nobis et numquam, minima eius. Nam eius, non unde ut aut sunt eveniet rerum repellendus porro.</p>
                        <p>Sint ab voluptates itaque, ipsum porro qui obcaecati cumque quas sit vel. Voluptatum provident id quis quo. Eveniet maiores perferendis officia veniam est laborum, expedita fuga doloribus natus repellendus dolorem ab similique sint eius cupiditate necessitatibus, magni nesciunt ex eos.</p>
                        <p>Quis eius aspernatur, eaque culpa cumque reiciendis, nobis at earum assumenda similique ut? Aperiam vel aut, ex exercitationem eos consequuntur eaque culpa totam, deserunt, aspernatur quae eveniet hic provident ullam tempora error repudiandae sapiente illum rerum itaque voluptatem. Commodi, sequi.</p>
                        <div className="row mb-5 mt-5">
                        <div className="col-md-12 mb-4">
                            <img src="images/img_1.jpg" alt="Image placeholder" className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-6 mb-4">
                            <img src="images/img_2.jpg" alt="Image placeholder" className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-6 mb-4">
                            <img src="images/img_3.jpg" alt="Image placeholder" className="img-fluid rounded"/>
                        </div>
                        </div>
                        <p>Quibusdam autem, quas molestias recusandae aperiam molestiae modi qui ipsam vel. Placeat tenetur veritatis tempore quos impedit dicta, error autem, quae sint inventore ipsa quidem. Quo voluptate quisquam reiciendis, minus, animi minima eum officia doloremque repellat eos, odio doloribus cum.</p>
                        <p>Temporibus quo dolore veritatis doloribus delectus dolores perspiciatis recusandae ducimus, nisi quod, incidunt ut quaerat, magnam cupiditate. Aut, laboriosam magnam, nobis dolore fugiat impedit necessitatibus nisi cupiditate, quas repellat itaque molestias sit libero voluptas eveniet omnis illo ullam dolorem minima.</p>
                        <p>Porro amet accusantium libero fugit totam, deserunt ipsa, dolorem, vero expedita illo similique saepe nisi deleniti. Cumque, laboriosam, porro! Facilis voluptatem sequi nulla quidem, provident eius quos pariatur maxime sapiente illo nostrum quibusdam aliquid fugiat! Earum quod fuga id officia.</p>
                        <p>Illo magnam at dolore ad enim fugiat ut maxime facilis autem, nulla cumque quis commodi eos nisi unde soluta, ipsa eius aspernatur sint atque! Nihil, eveniet illo ea, mollitia fuga accusamus dolor dolorem perspiciatis rerum hic, consectetur error rem aspernatur!</p>
            
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus magni explicabo id molestiae, minima quas assumenda consectetur, nobis neque rem, incidunt quam tempore perferendis provident obcaecati sapiente, animi vel expedita omnis quae ipsa! Obcaecati eligendi sed odio labore vero reiciendis facere accusamus molestias eaque impedit, consequuntur quae fuga vitae fugit?</p>
                        </div>
            
                        
                        <div className="pt-5">
                        <p>Categories:  <a href="#">Food</a>, <a href="#">Travel</a>  Tags: <a href="#">#manila</a>, <a href="#">#asia</a></p>
                        </div>
            
            
                        <div className="pt-5">
                        <h3 className="mb-5">6 Comments</h3>
                        <ul className="comment-list">
                            <li className="comment">
                            <div className="vcard">
                                <img src="images/person_1.jpg" alt="Image placeholder"/>
                            </div>
                            <div className="comment-body">
                                <h3>Jean Doe</h3>
                                <div className="meta">January 9, 2018 at 2:21pm</div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                <p><a href="#" className="reply rounded">Reply</a></p>
                            </div>
                            </li>
            
                            <li className="comment">
                            <div className="vcard">
                                <img src="images/person_1.jpg" alt="Image placeholder"/>
                            </div>
                            <div className="comment-body">
                                <h3>Jean Doe</h3>
                                <div className="meta">January 9, 2018 at 2:21pm</div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                <p><a href="#" className="reply rounded">Reply</a></p>
                            </div>
            
                            <ul className="children">
                                <li className="comment">
                                <div className="vcard">
                                    <img src="images/person_1.jpg" alt="Image placeholder"/>
                                </div>
                                <div className="comment-body">
                                    <h3>Jean Doe</h3>
                                    <div className="meta">January 9, 2018 at 2:21pm</div>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                    <p><a href="#" className="reply rounded">Reply</a></p>
                                </div>
            
            
                                <ul className="children">
                                    <li className="comment">
                                    <div className="vcard">
                                        <img src="images/person_1.jpg" alt="Image placeholder"/>
                                    </div>
                                    <div className="comment-body">
                                        <h3>Jean Doe</h3>
                                        <div className="meta">January 9, 2018 at 2:21pm</div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                        <p><a href="#" className="reply rounded">Reply</a></p>
                                    </div>
            
                                        <ul className="children">
                                        <li className="comment">
                                            <div className="vcard">
                                            <img src="images/person_1.jpg" alt="Image placeholder"/>
                                            </div>
                                            <div className="comment-body">
                                            <h3>Jean Doe</h3>
                                            <div className="meta">January 9, 2018 at 2:21pm</div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                            <p><a href="#" className="reply rounded">Reply</a></p>
                                            </div>
                                        </li>
                                        </ul>
                                    </li>
                                </ul>
                                </li>
                            </ul>
                            </li>
                        </ul>
                        
                        <div className="comment-form-wrap pt-5">
                            <h3 className="mb-5">Leave a comment</h3>
                            <form action="#" className="p-5 bg-light">
                            <div className="form-group">
                                <label for="name">Name *</label>
                                <input type="text" className="form-control" id="name"/>
                            </div>
                            <div className="form-group">
                                <label for="email">Email *</label>
                                <input type="email" className="form-control" id="email"/>
                            </div>
                            <div className="form-group">
                                <label for="website">Website</label>
                                <input type="url" className="form-control" id="website"/>
                            </div>
            
                            <div className="form-group">
                                <label for="message">Message</label>
                                <textarea name="" id="message" cols="30" rows="10" className="form-control"></textarea>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Post Comment" className="btn btn-primary"/>
                            </div>
            
                            </form>
                        </div>
                        </div>
            
                    </div>
            
            
                    <div className="col-md-12 col-lg-4 sidebar">
                        <div className="sidebar-box search-form-wrap">
                        <form action="#" className="search-form">
                            <div className="form-group">
                            <span className="icon fa fa-search"></span>
                            <input type="text" className="form-control" id="s" placeholder="Type a keyword and hit enter"/>
                            </div>
                        </form>
                        </div>
                        <div className="sidebar-box">
                        <div className="bio text-center">
                            <img src="images/person_2.jpg" alt="Image Placeholder" className="img-fluid mb-5"/>
                            <div className="bio-body">
                            <h2>Craig David</h2>
                            <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem facilis sunt repellendus excepturi beatae porro debitis voluptate nulla quo veniam fuga sit molestias minus.</p>
                            <p><a href="#" className="btn btn-primary btn-sm rounded px-4 py-2">Read my bio</a></p>
                            <p className="social">
                                <a href="#" className="p-2"><span className="fa fa-facebook"></span></a>
                                <a href="#" className="p-2"><span className="fa fa-twitter"></span></a>
                                <a href="#" className="p-2"><span className="fa fa-instagram"></span></a>
                                <a href="#" className="p-2"><span className="fa fa-youtube-play"></span></a>
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="sidebar-box">
                        <h3 className="heading">Popular Posts</h3>
                        <div className="post-entry-sidebar">
                            <ul>
                            <li>
                                <a href="">
                                <img src="images/img_1.jpg" alt="Image placeholder" className="mr-4"/>
                                <div className="text">
                                    <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                                    <div className="post-meta">
                                    <span className="mr-2">March 15, 2018 </span>
                                    </div>
                                </div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                <img src="images/img_2.jpg" alt="Image placeholder" className="mr-4"/>
                                <div className="text">
                                    <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                                    <div className="post-meta">
                                    <span className="mr-2">March 15, 2018 </span>
                                    </div>
                                </div>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                <img src="images/img_3.jpg" alt="Image placeholder" className="mr-4"/>
                                <div className="text">
                                    <h4>There’s a Cool New Way for Men to Wear Socks and Sandals</h4>
                                    <div className="post-meta">
                                    <span className="mr-2">March 15, 2018 </span>
                                    </div>
                                </div>
                                </a>
                            </li>
                            </ul>
                        </div>
                        </div>
                    </div>
            
                    </div>
                </div>
                </section>
                
                
                <div className="site-footer">
                <div className="container">
                    <div className="row">
                    <div className="col-12 text-center">
                        <p>
                        Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
                        </p>
                    </div>
                    </div>
                </div>
                </div>
                
            </div>
        );
    }
}
export default connect()(DetailPage);