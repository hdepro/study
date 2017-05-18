/**
 * Created by heben on 2017/5/6.
 */

import React,{PropTypes} from 'react'

export class Link extends React.Component{
    handleClick= (e) =>{
        e.preventDefault();
        let path = this.props.to;
        history.pushState(null,null,path);
        this.context.handlePathChange(path);
        //history.replaceState(null,null,path);
        //window.onhashchange(e);
    };
    render(){
        let path = this.props.to;
        let {children} = this.props;
        return (
            <a href="" onClick={this.handleClick}>
                {children}
            </a>
        )
    }
}

Link.contextTypes = {
    handlePathChange: PropTypes.func.isRequired,
    changeHasMatchPath:PropTypes.func.isRequired,
    hasMatchPath:PropTypes.string.isRequired
};

