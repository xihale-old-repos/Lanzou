#!/usr/bin/env python

import requests
import json

UA="Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4537.0 Safari/537.36 Edg/93.0.926.1"
header={"user-agent":UA}

def swn(str:str,start:str,end:str)->str:
    r=str.find(start)
    re=str.find(end,r+len(start))
    return str[r+len(start):re-len(end)+1]

def file(file,key=""):
    html=requests.get(file,headers=header)
    if html.text.find("输入密码")!=-1 and key=="":
        return "请输入密码!"
    if key=="":
        start=html.text.find("src=\"")
        start=html.text.find("src=\"",start+6) #找到目标
        end=html.text.find("\"",start+6)
        html=requests.get(url="https://xihale.lanzoui.com/"+html.text[start+6:end])
        data=html.text
        start=data.find("var ajaxdata = '")
        end=data.find("'",start+16)
        ajaxdata=data[start+16:end]
        start=data.find("'",end+3)
        end=data.find("'",start+1)
        postdown=data[start+1:end]
    else:
        start=html.text.find("&sign=")
        postdown=html.text[start+6:html.text.find("&p=",start+6)]

    html=requests.post(url="https://lanzoux.com/ajaxm.php",headers={"referer":html.url,"user-agent":UA},data={"action":"downprocess","sign":postdown,"p":key})
    data=json.loads(html.text)
    if data["url"]==0:
        return data["inf"]
    html=requests.get(url=data["dom"]+"/file/"+data["url"],headers={
        'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Connection': 'keep-alive',},allow_redirects=False)
    return html.headers['Location'] #获取重定向网址

def filer(filer,key=""):
    html=requests.get(filer,headers=header)
    r=html.text.find("data : {")+7
    re=html.text.find("}",r)
    text=html.text[r:re]+'}'
    text=text.strip()
    ib=swn(html.text,"'t':",",")
    ibs=swn(html.text,ib+" = '","'")
    ih=swn(html.text,"'k':",',')
    ihs=swn(html.text,ih+" = '","'")
    text=text.replace(ib,"'"+ibs+"'")
    text=text.replace(ih,"'"+ihs+"'")
    text=text.replace("pgs","'1'")
    text=text.replace("'",'"')
    if key!="":
        text=text.replace(":pwd",':"'+key+'"')
    else:
        l=list(text)
        l.pop(text.rfind(","))
        text=''.join(l)
    # print(text)
    text=json.loads(text)
    # print(text)
    html=requests.post("https://lanzoux.com/filemoreajax.php",headers={"referer":html.url,"user-agent":UA},data=text)
    
    data=json.loads(html.text)
    if data["info"]!="sucess":
        return data["info"]
    return data

# print(filer("https://xihale.lanzoui.com/b015tdsbi"))

# print(filer("https://xihale.lanzoui.com/b016811pi","xihale"))

# print(json.dumps("{a:1,b:2}"))