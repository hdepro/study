/**
 * Created by heben on 2017/5/1.
 */

var ReactClass = function(){};

ReactClass.prototype.render=function(){};

ReactClass.prototype.setState=function(newState){
    this._reactInternalInstance.receiveComponent(null,newState);
};

export function createClass(spec){
    var Constructor = function(props){
        this.props = props;
        this.state = this.getInitialState?this.getInitialState():null;
    };

    Constructor.prototype = new ReactClass();
    Constructor.prototype.constructor = Constructor;
    Object.assign(Constructor.prototype,spec);
    return Constructor;
};