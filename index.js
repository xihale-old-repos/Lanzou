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
	view(document.location.pathname);
})


function view(o) {
	alert(1);
	let url=o.previousSibling.previousSibling.value.split(":"),
		data=lanzouGet(url[0]+url[1],url[2]);
		if(data.code==0){document.write("error: "+data.info);return;}
		if(data.code==2){
			location.href=data.info;
			return;
		}
		$("#downloca").css("display","");
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
