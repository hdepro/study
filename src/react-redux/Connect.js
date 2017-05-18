/**
 * Created by heben on 2017/4/23.
 */

import {storeShape} from './PropPypes'
import React from 'react'

export function connect(mapStateToProps,mapDispatchToProps,mergeProps){
    return function(WrappedComponent){
        console.log(typeof WrappedComponent,JSON.stringify(WrappedComponent));
        class component extends React.Component{
            constructor(props,context){
                super(props);
                let store = context.store;
                console.log(store);
                let mapProps = mapStateToProps?mapStateToProps(store.getState()):{};
                this.unsubscribe = store.subscribe(this.onStateChanged.bind(this,store));
                let mapActions = mapDispatchToProps?mapDispatchToProps(store.dispatch):{dispatch:store.dispatch};
                this.selector = {};
                Object.assign(
                    this.selector,
                    this.props,
                    mapProps,
                    mapActions
                );
            }
            componentWillMount(){
                console.log("connect component componentWillMount");
            }
            shouldComponentUpdate(nextProps,nextState){
                console.log("connect shouldComponentUpdate ",nextProps,nextState,this.props,nextProps !== this.props);
                return true;
            }
            onStateChanged(store){
                this.setState((prevState,props)=>{
                    console.log("connect onStateChanged ",prevState,props);
                    Object.assign(this.selector,props,mapStateToProps(store.getState()));
                })
            }
            componentWillReceiveProps(nextProps){
                console.log("componentWillReceiveProps ",nextProps);
            }
            componentWillUpdate(nextProps,nextState){
                console.log("componentWillUpdate ",nextProps,nextState);
            }
            componentWillUnmount(){
                this.unsubscribe();
            }
            render(){
                return(
                    React.createElement(WrappedComponent,this.selector)
                )
            }
        }
        component.contextTypes = {
            store:storeShape.isRequired
        };
        return component;
    }
}