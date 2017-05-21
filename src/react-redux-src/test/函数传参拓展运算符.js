/**
 * Created by heben on 2017/5/3.
 */


function A(one,{b=1,c=2,...options}={}){
    console.log(one,b,c,options);
}

function B(){
    return A(-1,{b:11,d:33,c:22,e:44});
}

B();

//console.log({...{a:1,b:2}});