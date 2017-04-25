/**
 * Created by heben on 2017/4/23.
 */

import {storeShape} from './PropPypes'

export function connect(mapStateToProps,mapDispatchToProps,mergeProps){
    return function(Component){
        console.log(typeof Component,JSON.stringify(Component));
        class component extends Component{
            constructor(props,context){
                super(props);
                let store = context.store;
                console.log(store);
                let mapProps = mapStateToProps(store.getState());
                this.unsubscribe = store.subscribe(this.onStateChanged.bind(this,store));
                let mapActions = mapDispatchToProps?mapDispatchToProps(store.dispatch):{dispatch:store.dispatch};
                Object.assign(
                    this.props,
                    mapProps,
                    mapActions
                );
            }
            shouldComponentUpdate(nextProps,nextState){
                console.log("connect shouldComponentUpdate ",nextProps,nextState,this.props,nextProps !== this.props);
                return true;
            }
            onStateChanged(store){
                this.setState((prevState,props)=>{
                    console.log("connect onStateChanged ",prevState,props);
                    Object.assign(props,mapStateToProps(store.getState()));
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
        }
        component.contextTypes = {
            store:storeShape.isRequired
        };
        return component;
    }
}