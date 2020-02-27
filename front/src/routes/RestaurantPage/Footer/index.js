import React from 'react';
import {connect} from 'dva';
class Footer extends React.Component{
    render() {
        return(
            <footer class="ftco-footer ftco-bg-dark ftco-section">
                <div class="container">
                    <div class="row">
                    <div class="col-md-12 text-center">

                        <p>
                        Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i class="icon-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                        </p>
                    </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default connect()(Footer)