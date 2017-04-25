/**
 * Created by heben on 2017/4/23.
 */
import React from 'react'
import {storeShape} from './PropPypes'

export class Provider extends React.Component{
    constructor(props){
        super(props);
    }
    getChildContext(){
        return {store:this.props.store};
    }
    render(){
        return React.Children.only(this.props.children)
    }
}

Provider.childContextTypes = {
    store: storeShape.isRequired
};