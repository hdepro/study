/**
 * Created by heben on 2017/4/24.
 */

export const logger = store => next => action => {
    console.log("logger state",store.getState());
    next(action);
    console.log("logger next state",store.getState());
};

export const logger2 = store => next => action => {
    console.log("logger2 state",store.getState());
    next(action);
    console.log("logger2 next state",store.getState());
};


export const logger3 = store => next => action => {
    console.log("logger3 state",store.getState());
    next(action);
    console.log("logger3 next state",store.getState());
};
