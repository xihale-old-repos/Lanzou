const lanzou=location.protocol+'//'+location.host;
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

// var path = window.location.pathname;
// if (path == "") { // 空

// }
$(function(){
	$("#select-exchange").on("click",function(){
		var file=$("file");
		for(let i=0;i<file.length;++i)
			$(file[i]).find(":first-child").trigger('click');
	});
	$("#download").on("click",function(){
		var file=$("file");
		for(let i=0;i<file.length;++i){
			if($(file[i]).find(":first-child").css("background-color")!="rgba(0, 0, 0, 0)"){
				let v=lanzouGet($(file[0]).attr("url"));
				if(v.code==0)alert(v.info);
				else window.open(v.info);
			}
		}
	});
})


function view(o) {
	let data=lanzouGet(o);
		if(data.code==0){document.write("error: "+data.info);return;}
		if(data.code==1){
			location.href=data.info;
			return;
		}
		$("#download").css("display","");
		data=data.info;
		if(data.zt!=1){console.log("error: "+data.info);return;}
		data=data.text;
		main=$("main")[0];
		main.classList.add("GoToTop");
		$(main).find("#hr,#header,#select-all").css("display",'');
		for(i=0;i<data.length;++i){
			console.log(data[i]);
			var html='<file url='+data[i].id+'><div class="select"></div><div class="filename">'+data[i].name_all+'</div><div class="filesize">'+data[i].size+'</div><div class="filetype">'+data[i].icon+'</div></file>';
			$(main).append(html);
		}
		$(main).find(".select").on("click",function(){
			var rgb=$(this).css("background-color");
			if(rgb=="rgba(0, 0, 0, 0)"){
				$(this).css("background-color","#1E90FF");
			}
			else{
				$(this).css("background-color","rgba(0, 0, 0, 0)");
			}
		});
		$(main).find("file div:not(.select)").on("click",function(){
			$(this).parent().find(".select").trigger('click');
		});
}
view(document.location.pathname);
