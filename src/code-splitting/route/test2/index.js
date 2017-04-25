/**
 * Created by heben on 2016/8/17.
 */

module.exports = {
    path: 'test2',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./test2'))
        })
    }
};