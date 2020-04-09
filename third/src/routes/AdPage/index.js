import React from 'react';
import { connect } from 'dva';
import DragArea from './DragArea'
class AdPage extends React.Component{
    render(){
        return (<DragArea/>);
    }
}
export default connect()(AdPage);