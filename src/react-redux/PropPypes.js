/**
 * Created by heben on 2017/4/23.
 */

import {PropTypes} from 'react'

export const storeShape = PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
})