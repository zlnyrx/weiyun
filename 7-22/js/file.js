//处理行为
var checkAll = document.querySelector('.checkAll');
var content = document.getElementById('content');
var toolBtns = document.getElementById('toolBtns').children;
var newName = document.getElementById('newName');
var moveF = document.getElementById('move');
var spanN = moveF.getElementsByTagName('span')[0];
var elements = [];
var boxs = [];
var currentPid = 0;
//把数据生成视图
for(var i=0;i<datas.length;i++) {
	if(datas[i].pid == 0) {
		creatFiles(datas[i]);
	};
};
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
				var name2 = elements[i].lastChild.innerHTML;
				var input = document.createElement('input');
				elements[i].appendChild(input);
				elements[i].checked = false;
				elements[i].className = 'file';
				input.previousElementSibling.style.display = 'none';
				input.style.cssText = 'width: 123px;height: 25px;border:1px solid #c3d8f0;text-align:center;';
				input.onblur = function() {
				for(var i=0;i<datas.length;i++) {
					if(this.value == datas[i].name) {
						this.value = name2;
						newName.style.display = 'block';
						setTimeout(function() {
							newName.style.display = 'none';
						},2000)
					}
				}
					this.previousElementSibling.innerHTML = this.value;
					input.previousElementSibling.style.display = 'block';
					input.parentNode.removeChild(input);
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
				//elements[i].checked = true;
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
