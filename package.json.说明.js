/**
 * Created by heben on 2017/4/26.
 */


let obj = {
    "name": "test-app",
    "version": "0.0.0",
    "description": "test app",
    "scripts": {
        "start": "webpack-dev-server --port 8888 --hot --inline"
    },
    "babel": {
        "presets": [                //设置转码规则
            "react",                 //react转码规则,也就是处理jsx语法
            "es2015",                 //es2015转码规则,把es6语法转成es5语法(比如let,const,箭头函数),但不转码API
            "stage-0"                 //解决es7的一些语法，比如({...{a:1}},Object.entries)
        ]
    },
    "devDependencies": {
        "babel-core": "^6.24.1",          //设置转码器，与babel-loader一起连用
        "babel-loader": "^7.0.0",         //设置转码器，与babel-core一起连用
        "babel-preset-es2015": "^6.24.1",
        "babel-preset-react": "^6.24.1",
        "babel-preset-stage-0": "^6.24.1",
        "webpack": "^2.4.1",
        "ejs": "^2.5.6",                    //express的渲染模板引擎
        "body-parser": "^1.17.1",            //解析request的body
        "babel-plugin-import": "^1.1.1",    //设置antd的按需加载
        "css-loader": "^0.27.3",             //加载css文件，识别import '.css'
        "style-loader": "^0.16.1",           //把样式应用到元素上，通常和css-loader连用，并且配置在前面['style-loader','css-loader']
    },
    "dependencies": {
        "babel-polyfill": "^6.23.0",    //转码es6的API,如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign),Array.from
        "isomorphic-fetch": "^2.2.1",   //解决ie等浏览器不支持fetch
        "react": "^15.5.4",
        "react-dom": "^15.5.4",
        "react-redux": "^5.0.4",
        "react-router": "^4.1.1",
        "redux": "^3.6.0",
        "redux-thunk": "^2.2.0"
    }
};
