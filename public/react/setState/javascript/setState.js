/**
 * Created by heben on 2017/3/22.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'

function FormattedDate(props) {
  return <h2>It is {props.date}.</h2>;
}

class Test extends React.Component{
    render(){
        console.log("test");
        return(
            <div className={this.props.test}>
                {this.props.test}
            </div>
        )
    }
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: 1,test:1};
    this.handleClick=this.handleClick.bind(this);
  }

  componentDidMount() {
    // this.timerID = setInterval(
    //   () => this.tick(),
    //   10000
    // );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
    console.log(this.state.date);
  }

  handleClick(){
    console.log("start = "+this.state.date);
    this.setState((prevState,props)=>{
      console.log("setState callback");
      return {date:prevState.date+1}
    });
    console.log("end = "+this.state.date);
  }
    handleClickTest(){
    this.setState({
      test:1
    });
    }
  render() {
    console.log("render state = "+this.state.date);
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
        <button onClick={this.handleClick}>更新699</button>
        <button onClick={this.handleClickTest.bind(this)}>更新Test</button>
        <Test test={this.state.test}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('setState')
);

