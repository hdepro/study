/**
 * Created by heben on 2017/8/29.
 */

import React from 'react'
import ReactDOM from 'react-dom'


class EventListener{
    constructor(){
        this.listeners = {};
    }
    register(name,func){
        this.listeners[name] = func;
    }
    callHandler(name,args){
        if(typeof this.listeners[name] === "function"){
            this.listeners[name].call(this,args);
        }
    }
}

class Child extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        console.log("child componentDidMount");
    }
    foo(args){
        console.log("foo is call",args);
    }
    render(){
        return(
            <div>
                child
            </div>
        )
    }
}

function HOCEvent(ChildCom){
    return class HOCChild extends ChildCom{
        constructor(props){
            super(props);
        }
        componentDidMount(){
            console.log("HOCChild componentDidMount");
            super.componentDidMount();
            this.exportInnerFunc(this.props.exportInnerApi);
        }
        exportInnerFunc(es){
            es.register("foo",this.foo.bind(this));
        }
    }
}

let EventChild = HOCEvent(Child);

class Father extends React.Component{
    constructor(props){
        super(props);
        this.es = new EventListener();
    }
    render(){
        return(
            <div>
                <button onClick={() => {
                    this.es.callHandler("foo","father")
                }}>按钮</button>
                <EventChild exportInnerApi={this.es}/>
            </div>
        )
    }
}

ReactDOM.render(<Father />,document.getElementById("resetProps"));


// class EventListener{
//     constructor(){
//         this.listeners = {};
//     }
//     register(name,func){
//         this.listeners[name] = func;
//     }
//     callHandler(name,args){
//         if(typeof this.listeners[name] === "function"){
//             this.listeners[name].call(this,args);
//         }
//     }
// }
//
// class Child extends React.Component{
//     constructor(props){
//         super(props);
//     }
//     componentDidMount(){
//         this.exportInnerFunc(this.props.exportInnerApi);
//     }
//     exportInnerFunc(es){
//         es.register("foo",this.foo.bind(this));
//     }
//     foo(args){
//         console.log("foo is call",args);
//     }
//     render(){
//         return(
//             <div>
//                 child
//             </div>
//         )
//     }
// }
//
// Child.propTypes = {
//     exportInnerApi:React.PropTypes.func
// };
//
//
// class Father extends React.Component{
//     constructor(props){
//         super(props);
//         this.es = new EventListener();
//     }
//     render(){
//         return(
//             <div>
//                 <button onClick={() => {
//                     this.es.callHandler("foo","father")
//                 }}>按钮</button>
//                 <Child exportInnerApi={this.es}/>
//             </div>
//         )
//     }
// }
//
// ReactDOM.render(<Father />,document.getElementById("resetProps"));



// class Child extends React.Component{
//     constructor(props){
//         super(props);
//     }
//     componentWillReceiveProps(prevProps,nextProps){
//         console.log("componentWillReceiveProps",prevProps,nextProps);
//     }
//     shouldComponentUpdate(nextProps){
//         console.log("shouldComponentUpdate",nextProps);
//     }
//     render(){
//         return(
//             <div>
//                 child
//             </div>
//         )
//     }
// }
//
// Child.propTypes = {
//     reset:React.PropTypes.boolean
// };
//
//
// class Father extends React.Component{
//     constructor(props){
//         super(props);
//         this.handleClick = this.handleClick.bind(this);
//         this.state = {reset:0};
//     }
//     handleClick(){
//         let tmp = this.state.reset;
//         this.setState({reset:tmp+1});
//     }
//     render(){
//         return(
//             <div>
//                 <button onClick={this.handleClick}>按钮</button>
//                 <Child reset={this.state.reset}/>
//             </div>
//         )
//     }
// }
//
// ReactDOM.render(<Father />,document.getElementById("resetProps"));