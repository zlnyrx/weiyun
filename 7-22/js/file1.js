//处理行为
var checkAll = document.querySelector('.checkAll');
var content = document.getElementById('content');
var toolBtns = document.getElementById('toolBtns').children;
var newName = document.getElementById('newName');
var moveF = document.getElementById('move');
var spanN = moveF.getElementsByTagName('span')[0];
var breadcrumbList = document.getElementsByClassName('list')[0];
var breadcrumb = document.getElementById('breadNav');
var elements = [];
var boxs = [];
var currentPid = 0;
//把数据生成视图
for(var i=0;i<datas.length;i++) {
	if(datas[i].pid == 0) {
		creatFiles(datas[i]);
	};
};
 showBreadcrumb();
//是否全选
var onOff = true;
checkAll.onclick = function() {
	if(onOff) {
		checkAll.className = 'checkAll checkedAll';
		onOff = false;
	}else{
		checkAll.className = 'checkAll';
		onOff = true;
	}
	for(var i=0;i<elements.length;i++) {
		setStatus(elements[i],!onOff);
	}
}
//重命名
toolBtns[3].onclick = function() {
	if(getChecked().length == 1) {
		for(var i=0;i<elements.length;i++) {
			if(elements[i].checked) {
				var r = elements[i];
				var name2 = r.lastChild.innerHTML;
				var input = document.createElement('input');
				r.appendChild(input);
				r.checked = false;
				r.className = 'file';
				var pre = input.previousElementSibling;
				pre.style.display = 'none';
				input.style.cssText = 'width: 123px;height: 25px;border:1px solid #c3d8f0;text-align:center;';
				document.onmousedown = function(e) {
					//console.log(1)
					e.cancelBubble = true;
					for(var i=0;i<datas.length;i++) {
						if(input.value == datas[i].name) {
							input.value = name2;
							newName.style.display = 'block';
							setTimeout(function() {
								newName.style.display = 'none';
							},2000)
						}
					}
					pre.innerHTML = input.value;
					pre.style.display = 'block';
					r.removeChild(input);
				}
			}
			
			elements[i].lastChild.onmousemove = function(e) {
				e.cancelBubble = true;
			}
			elements[i].lastChild.onclick = function(e) {
				e.cancelBubble = true;
			}
		}
	}
}
//删除
toolBtns[4].onclick = function() {
	if(getChecked().length != 0) {
		for(var i=0;i<elements.length;i++) {
			if(elements[i].checked) {
				content.removeChild(elements[i]);
			}
		}
	}
}
//新建文件夹
var num = 0;
toolBtns[5].onclick = function(e) {
	num++;
	e.cancelBubble = true;
	var name1 = '新建文件夹('+num+')';
	datas.push({
		id: getMaxid()+1,
		pid: currentPid,
		name: name1,
		type: 'folder'
	})
	render( getChildren(currentPid) );
	var last = content.lastElementChild.lastElementChild;
}
breadcrumb.onclick = function(e) {
 	if (e.target.tagName.toLowerCase() == 'a') {
        currentPid = e.target.getAttribute('fileId');
        render( getChildren(currentPid) );
        showBreadcrumb();
    }
}
//框选
content.onmousedown = function(e) {
	for(var i=0;i<elements.length;i++) {
		elements[i].className = 'file';
	}
	var arr = [];
	var X = e.clientX;
	var Y = e.clientY;
	var box = document.createElement('div');
	box.className = 'box';
	box.style.left = X + 'px';
	box.style.top = Y + 'px';
	document.body.appendChild(box);
	document.onmousemove = function(e) {
		box.style.width = Math.abs(e.clientX-X) + 'px';
		box.style.height = Math.abs(e.clientY-Y) + 'px';
		box.style.left = Math.min(e.clientX,X)+'px';
		box.style.top = Math.min(e.clientY,Y)+'px';
		var boxL = box.offsetLeft;
		var boxW = box.offsetWidth;
		var boxT = box.offsetTop;
		var boxH = box.offsetHeight;
		for(var i=0;i<elements.length;i++) {
			var rec = elements[i].getBoundingClientRect();
			elements[i].W = rec.width;
			elements[i].H = rec.height;
			elements[i].T = rec.top;
			elements[i].L = rec.left;
			
			if(elements[i].L+elements[i].W>boxL && elements[i].L<boxL+boxW && elements[i].T<boxH+boxT && boxT<elements[i].H+elements[i].T) {
				elements[i].className = 'file file-checked';
				elements[i].checked = true;
				arr.push(elements[i]);
			}
		}
		
	}
	document.onmouseup = function() {
		for(var i=0;i<arr.length;i++) {
			arr[i].className = 'file file-checked';
		}
		document.onmousemove = null;
		document.body.removeChild(box);
		box = null;
	}

	return false;
}
function creatFiles(data) {
	var div = document.createElement('div');
	div.fileId = data.id;//自定义属性记录当前id
	div.className = 'file';
	
	
	var checkbox = document.createElement('span');
	checkbox.className = 'checkbox';
	div.appendChild(checkbox);
	
	var img = document.createElement('div');
	img.className = 'image image-'+data.type;
	div.appendChild(img);
	
	var name = document.createElement('a');
	name.href = 'javascript:;';
	name.className = 'name';
	name.innerHTML = data.name;
	div.appendChild(name);
	
	content.appendChild(div);
	elements.push(div);//当前页面中所有的div
	div.checked = false;
	//鼠标移入=>如果是勾选状态，保持勾选；如果不是勾选状态，则变为移入状态
	div.onmousemove = function() {
		if(div.checked) {
			div.className = 'file file-checked';
		}else{
			div.className = 'file file-hover';
		}
	}
	//鼠标移出=>如果是勾选状态，保持勾选；如果不是勾选状态，则变为移出状态
	div.onmouseout = function() {
		if(div.checked) {
			div.className = 'file file-checked';
		}else{
			div.className = 'file';
		}
		
	}
	//勾选框的点击
	
	checkbox.onclick = function(e) {
		e.cancelBubble = true;
	}
	checkbox.onmouseup = function(e) {
		e.cancelBubble = true;
	}
	checkbox.onmousedown = function(e) {
		e.cancelBubble = true;
		setStatus(div, !div.checked);
		
		//如果页面中所有的checkbox选中，则checkAll也选中；否则checkAll不选中
		if(getChecked().length == elements.length) {
			console.log(getChecked().length)
			checkAll.className = 'checkAll checkedAll';
		}else{
			checkAll.className = 'checkAll';
		}
	}
	//div点击
	div.onclick = function(e) {
		currentPid = this.fileId;//记录当前pid
		render(getChildren(this.fileId));
		e.cancelBubble = true;
		showBreadcrumb();
	}
	//拖拽
	div.onmousedown = function(e) {
		var arr1=[];//存放选中的文件夹																
		var arr2=[];//存放未选中的文件夹
		div.className="file file-checked";
		for(var i=0;i<elements.length;i++) {
			if(elements[i].className == 'file file-checked') {
				arr1.push(elements[i]);
			}else{
				arr2.push(elements[i]);
			}
		}
		
		document.onmousemove = function(e) {
			var disX = e.clientX;
			var disY = e.clientY;
			div.className="file file-checked";
			moveF.style.display = 'block';
			spanN.innerHTML = arr1.length;
			moveF.style.left = disX+'px';
			moveF.style.top = disY+'px';
			return false;
		}
		
		document.onmouseup = function(e) {
			for(var i=0;i<arr2.length;i++) {
				var rec = arr2[i].getBoundingClientRect();
				//如果鼠标抬起的位置在某个div上，则是移动数据；否则不做任何数据更改
				if(rec.left<e.clientX && e.clientX<rec.right || rec.bottom<e.clientY && e.clientY<rec.top) {
					for(var j=0;j<arr1.length;j++) {
						for(k=0;k<datas.length;k++) {//更改数据的pid
							if(datas[k].id==arr1[j].fileId) {
								datas[k].pid=arr2[i].fileId;
							}
						}
						render(getChildren(currentPid));
					}
				}else{
					for(var j=0;j<arr1.length;j++) {
						arr1[j].className = 'file';
					}
				}
			}
			
			document.onmousemove = null;
			moveF.style.display = 'none';
		}
		e.cancelBubble = true;
	}
	//右键oncontextmenu
	div.oncontextmenu = function(e) {
		for(var i=0;i<elements.length;i++) {
			if(elements[i].className = 'file') {
				menu.style.display="block";
				menu.style.left=(e.clientX+10)+'px';
				menu.style.top=(e.clientY+90)+'px';
				div.className="file file-checked";
			}else{
				menu2.style.display="block";
				menu2.style.left=e.clientX+'px';
				menu2.style.top=e.clientY+'px';
			}
		}
		
		document.onmousemove =null;
		return false;
		e.cancelBubble=true;
	}
	content.onclick = function() {
		menu.style.display="none";
	}
}
