/**
 * Created by heben.hb on 2017/8/13.
 */

let count = 0;

import React from 'react'
import ReactDOM from 'react-dom'

class MyComponent extends React.Component{
    constructor(){
        super();
        this.state = {
            count : count
        };
    }

    componentWillMount(){
        this.setState({
            count : ++count
        });

        this.setState({
            count : ++count
        });

        setTimeout(() => {
            this.setState({
                count : ++count
            });

            this.setState({
                count : ++count
            });
        }, 1000);
    }

    componentDidMount(){
        this.button.addEventListener('click', this.onClick.bind(this, '原生浏览器事件'), false);
    }

    onClick(info) {
        console.log(info);

        this.setState({
            count : ++count
        });

        this.setState({
            count : ++count
        });
    }

    render() {
        console.log(this.state.count);
        return (
            <div>
                <button type="button" ref={node => this.button = node} onClick={this.onClick.bind(this, 'React事件')}>生成新计数</button>
                <div>Count : {this.state.count}</div>
            </div>
        );
    }
}

ReactDOM.render(<MyComponent />, document.getElementById("transaction"));

class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            val: 0
        };
    }

    componentDidMount() {
        this.setState({val: this.state.val + 1});
        console.log(this.state.val);    // 第 1 次 log

        this.setState({val: this.state.val + 1});
        console.log(this.state.val);    // 第 2 次 log

        setTimeout(() => {
            this.setState({val: this.state.val + 1});
            console.log(this.state.val);  // 第 3 次 log

            this.setState({val: this.state.val + 1});
            console.log(this.state.val);  // 第 4 次 log
        }, 0);
    }

    render() {
        return <div>{this.state.val}</div>;
    }
};
ReactDOM.render(<Example />, document.getElementById("Example"));