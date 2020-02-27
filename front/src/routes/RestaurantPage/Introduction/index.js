import React from 'react';
import {connect} from 'dva';
class Introduction extends React.Component{
    render() {
        return(
            <section class="ftco-section-2">
            <div class="container d-flex">
              <div class="section-2-blocks-wrapper row">
                <div class="img col-sm-12 col-lg-6" style={{backgroundImage: 'url(images2/about-2.jpg)'}}>
                </div>
                <div class="text col-lg-6 ftco-animate">
                  <div class="text-inner align-self-start">
                    <span class="subheading">About Tasty</span>
                    <h3 class="heading">Our chef cooks the most delicious food for you</h3>
                    <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
      
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