/**
 * Created by heben on 2017/5/6.
 */

function handlePath(...path){
    let res = path.map(p => ("/"+p+"/").split(/\/+/g).join("/").slice(0,-1));
    if(path.length === 1) return res[0];
    return res;
}

console.log(handlePath("/a/8/v","a/8/v","/a/8/v/","/a8//v"));
console.log(handlePath("/a/8/v"));


function pathIsEqual(path1,path2){
    return handlePath(path1) === handlePath(path2);
}

console.log(pathIsEqual("/a/8/v","a/8/v"));


function pathStartWith(root,path){
    return (handlePath(root)+"/").indexOf(handlePath(path)+"/") === 0;
}

console.log(pathStartWith("/ab/8/v/c","ab/c8//"));


function handlePathToArray(...path){
    let res = path.map(p => ("/"+p+"/").split(/\/+/g).slice(1,-1));
    if(path.length === 1) return res[0];
    return res;
}

console.log(handlePathToArray("/ab/8/v","a///"));





export {
    handlePath,
    pathIsEqual,
    pathStartWith
}