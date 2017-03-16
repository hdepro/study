/**
 * Created by heben on 2016/8/17.
 */


module.exports = {
    path: 'test1',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./test1'))
        })
    }
}