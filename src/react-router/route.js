/**
 * Created by heben on 2017/5/6.
 */

import React,{PropTypes} from 'react'
import {pathIsEqual,pathStartWith} from './handlePath'

export class Route extends React.Component{
    constructor(props,context){
        super(props);
        this.props.path = this.props.path || "/";
    }
    componentWillMount(){
        this.context.changeHasMatchPath(this.props.path);
    }
    render(){
        let {path,children,component} = this.props;
        path  = this.context.hasMatchPath + "/" + path;
        let pathname = location.pathname;
        if(!children) return React.createElement(component,this.props);
        if(!Array.isArray(children)) children = [children];
        let targetChild = children.find(c => pathStartWith(path + "/" + c.props.path,pathname));
        return React.createElement(component,this.props,targetChild);
    }
}

Route.contextTypes = {
    handlePathChange: PropTypes.func.isRequired,
    changeHasMatchPath:PropTypes.func.isRequired,
    hasMatchPath:PropTypes.string.isRequired
};