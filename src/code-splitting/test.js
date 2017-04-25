/**
 * Created by heben on 2017/3/18.
 */
import React,{Component} from'react'
import ReactDOM from 'react-dom'
import {Router,Route,Link,browserHistory,hashHistory} from 'react-router'

class Test extends Component{
    render(){
        return(
            <div>
                <div>Test</div>
                <Link to="test1">test1</Link>
                <Link to="test2">test2</Link>
                {this.props.children}
            </div>
        )
    }
}

class Test1 extends Component{
    render(){
        return(
            <div>Test1111111111111111111111111</div>
        )
    }
}

class Test2 extends Component{
    render(){
        return(
            <div>Test2222222222222222222222222</div>
        )
    }
}

const routes = {
    path: '/',
    component:Test,
    indexRoute:{
        component:Test1
    },
    childRoutes:[
        {
            path:"test1",
            component:Test1
        },
        {
            path:"test2",
            component:Test2
        }
    ]
};

ReactDOM.render(
    <Router history={browserHistory} routes={routes}/>,document.getElementById("code-splitting")
);


// ReactDOM.render(
//     <Router history={browserHistory}>
//         <Route path="/" component={Test}>
//             <Route path="test1" component={Test1}/>
//             <Route path="test2" component={Test2}/>
//         </Route>
//     </Router>,
//     document.getElementById("code-splitting")
// );