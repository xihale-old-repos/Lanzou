// var path = window.location.pathname;
// if (path == "") { // 空

// }
$(function(){
	$("#select-all").bind("click",function(){
		var file=$("file");
		for(let i=0;i<file.length;++i)
			$(file[i]).find(":first-child").click();
	});
	$("#download").bind("click",function(){
		var file=$("file");
		// file[0].getAttribute("url");
		// $(file[0]).attr("url");
		for(let i=0;i<file.length;++i){
			if($(file[i]).find(":first-child").css("background-color")!="rgba(0, 0, 0, 0)")
				$.get("https://api.xihale.top:444/lanzou",{url:"https://lanzoux.com/"+$(file[0]).attr("url")},function(data){
					window.open(JSON.parse(data).info);
				});
		}
	});
})


function view(o) {
	url=o.previousSibling.previousSibling.value.split(":");
	$.get('https:\\\\api.xihale.top:444\\lanzou', {
		url: url[0]+":"+url[1],  //注意空气
		key: url[2]
	},(data)=>{
		if(data[0]!='{'){console.log("error: "+data);return;}
		data=JSON.parse(data);
		if(data.code==-1){console.log("error: "+data.info);return;}
		if(data.code==1){
			window.open(data.info);
			return;
		}
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
			$(this).parent().find(".select").click();
		});
	});
}
