/**
 * Created by heben on 2017/5/6.
 */

import React,{PropTypes} from 'react'
import {pathIsEqual,pathStartWith,handlePath} from './handlePath'

export class Router extends React.Component{
    constructor(props) {
        super(props);
        this.hasMatchPath = "";
        this.props.path = this.props.path || "/";
    }
    getChildContext(){
        return {
            changeHasMatchPath:this.changeHasMatchPath.bind(this),
            subscribePathChange:this.subscribePathChange.bind(this),
            hasMatchPath:this.hasMatchPath,
            handlePathChange:this.handlePathChange.bind(this)
        }
    }
    changeHasMatchPath(path){
        this.hasMatchPath += "/"+path;
    }
    componentWillMount(){
        //window.onhashchange = this.handleStateChange.bind(this);
        //window.addEventListener("hashchange",this.handleStateChange.bind(this));
        //window.addEventListener("popstate",this.handleStateChange.bind(this));
        function getRoutes(route){
            let routes = {};
            routes.path = route.props.path;
            routes.component = route.props.component;
            let {children} = route.props;
            if(!children) return routes;
            routes.childRoutes = [];
            if(!Array.isArray(children)) {
                routes.childRoutes.push(getRoutes(children));
                return routes;
            }
            for(let child of children){
                routes.childRoutes.push(getRoutes(child));
            }
            return routes;
        }
        this.routes = getRoutes(this);
        console.log("this.routes",this.routes);
        this.hasMatchPath = this.props.path+"/";
    }
    subscribePathChange(){

    }
    componentWillUnmount(){
        //window.onhashchange = null;
    }
    handleChange(e){
        console.log(e.target);
        this.forceUpdate();
    };
    handlePathChange(path,state){
        let hasMatchPath = "",update = this,child;
        function findUpdateComponent(path,childRoutes){
            for(let i=0;i<childRoutes.length;i++){
                child = childRoutes[i];
                if(pathStartWith(path,hasMatchPath+"/"+child.path)){
                    hasMatchPath += "/"+child.path;
                    if(pathIsEqual(path,hasMatchPath)) return ;
                    findUpdateComponent(path,child.childRoutes);
                    update = update.props.children[i];
                }
            }
        }
        findUpdateComponent(path,this.routes.childRoutes);
        console.log("update",update,update.props.path);
        this.forceUpdate();
        this.hasMatchPath = this.props.path+"/";
    };
    addRoute(route,self){

    }
    render(){
        let {history,children,path} = this.props;
        let pathname = location.pathname;
        if(!pathStartWith(pathname,path) || !children) return ;
        if(!Array.isArray(children)) children = [children];
        let targetChild = children.find(c => pathStartWith(pathname,c.props.path));
        console.log("targetChild",targetChild);
        if(!targetChild)  return null;
        return targetChild;
    }
}

Router.childContextTypes = {
    handlePathChange: PropTypes.func.isRequired,
    subscribePathChange: PropTypes.func.isRequired,
    changeHasMatchPath:PropTypes.func.isRequired,
    hasMatchPath:PropTypes.string.isRequired
};