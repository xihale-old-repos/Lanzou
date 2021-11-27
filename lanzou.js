const lanzou='https://lanzoux.com';
function ajax(url,data=null,headers={},type='POST'){
    var r;
    $.ajax({url:url,data:data,type:type,headers:headers,async:false,success:(result)=>{
        r=result;
    }});
    return r;
}
function lanzouGet(url,pwd=''){
    if(url.match(/^http/)===null)url=`${lanzou}/${url}`;
    const maker=function(a,b){return {code:a,info:b};},swn=function(str,start,end){s=str.indexOf(start);return str.substring(s+start.length,str.indexOf(end,s+1));};
    let data,file=ajax(url,null,{},"GET");
    if(file.indexOf("文件不存在，或已删除")!=-1)return maker(0,"文件不存在，或已删除");
    if(file.indexOf("文件受密码保护，请输入密码继续下载")!=-1&&pwd=='')
        while(pwd==null||pwd=="")
            pwd=prompt("需要密码","");
    if(file.indexOf("filemoreajax.php")!=-1){ //filer
        pgs=1;
        eval(swn(file,"var pgs;","pgs =1;"));
        eval('data={'+swn(file,"data : {","}")+'}');
        return maker(2,ajax(`${lanzou}/filemoreajax.php`,data));
    }else{ // file
        let start=file.indexOf('/',file.lastIndexOf('e>-',file.length-1062));
        file=ajax(lanzou+file.substring(start,file.indexOf('"',start+1)),null,{},"GET");
        eval("var"+swn(file,'var','$'));
        eval(`data=${swn(file,'data : ','}')}}`);
        data=ajax(`${lanzou}/ajaxm.php`,data);
        return maker(1,`${data.dom}/file/${data.url}`);
    }
}
// file('https://xihale.lanzoui.com/iAVdonx0egb');
// console.log(lanzouGet('https://xihale.lanzoui.com/iAVdonx0egb'));