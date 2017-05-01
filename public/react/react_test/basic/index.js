/**
 * Created by heben on 2017/5/1.
 */

import {React} from "../../../../src/react/React.js"

var TodoList = React.createClass({
    getInitialState: function() {
        return {items: []};
    },
    add:function(){
        var text = document.querySelector("input").value;
        console.log("value text = "+text);
        var nextItems = this.state.items.concat([text]);
        this.setState({items: nextItems, text: ''});
    },
    onChange: function(e) {
        this.setState({text: e.target.value});
    },
    render: function() {
        var createItem = function(itemText) {
            return React.createElement("div", null, itemText);
        };

        var lists = this.state.items.map(createItem);
        var input = React.createElement("input");
        var button = React.createElement("button", {onclick: this.add.bind(this)}, 'Add#' + (this.state.items.length + 1))
        //var children = lists.concat([input,button])
        var children = [input,button].concat(lists);

        return React.createElement("div", null,children);
    }
});
React.render(React.createElement(TodoList), document.getElementById("basic"));
