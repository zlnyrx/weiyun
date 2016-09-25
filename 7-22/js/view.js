//逻辑渲染封装
/*根据指定数据创建视图
 * 
 */
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
//	console.log(boxs.length)
//	checkbox.onmousedown=function(e){													//为什么取消冒泡？我忘了，反正事件这么多，取消一下没坏处
//			e.cancelBubble=true;
//		}
	checkbox.onclick = function(e) {
		e.cancelBubble = true;
	}
	
	checkbox.onmousedown = function(e) {
		
		setStatus(div, !div.checked);
		
		//如果页面中所有的checkbox选中，则checkAll也选中；否则checkAll不选中
		if(getChecked().length == elements.length) {
			console.log(getChecked().length)
			checkAll.className = 'checkAll checkedAll';
		}else{
			checkAll.className = 'checkAll';
		}
		e.cancelBubble = true;
	}
	//div点击
	div.onclick = function(e) {
		currentPid = this.fileId;//记录当前pid
		render(getChildren(this.fileId));
		e.cancelBubble = true;
	}
	//拖拽
//	div.onmousedown = function(e) {
//		var arr1=[];//存放选中的文件夹																
//		var arr2=[];//存放未选中的文件夹
//		div.className="file file-checked";
//		for(var i=0;i<elements.length;i++) {
//			if(elements[i].className == 'file file-checked') {
//				arr1.push(elements[i]);
//			}else{
//				arr2.push(elements[i]);
//			}
//		}
//		
//		document.onmousemove = function(e) {
//			var disX = e.clientX;
//			var disY = e.clientY;
//			div.className="file file-checked";
//			moveF.style.display = 'block';
//			spanN.innerHTML = arr1.length;
//			moveF.style.left = disX+'px';
//			moveF.style.top = disY+'px';
//			return false;
//		}
//		
//		document.onmouseup = function(e) {
//			for(var i=0;i<arr2.length;i++) {
//				var rec = arr2[i].getBoundingClientRect();
//				//如果鼠标抬起的位置在某个div上，则是移动数据；否则不做任何数据更改
//				if(rec.left<e.clientX && e.clientX<rec.right || rec.bottom<e.clientY && e.clientY<rec.top) {
//					for(var j=0;j<arr1.length;j++) {
//						for(k=0;k<datas.length;k++) {//更改数据的pid
//							if(datas[k].id==arr1[j].fileId) {
//								datas[k].pid=arr2[i].fileId;
//							}
//						}
//						render(getChildren(currentPid));
//					}
//				}else{
//					for(var j=0;j<arr1.length;j++) {
//						arr1[j].className = 'file';
//					}
//				}
//			}
//			
//			document.onmousemove = null;
//			moveF.style.display = 'none';
//		}
//		e.cancelBubble = true;
//	}
	//右键oncontextmenu
//	div.oncontextmenu = function(e) {
//		for(var i=0;i<elements.length;i++) {
//			if(elements[i].className = 'file') {
//				menu.style.display="block";
//				menu.style.left=e.clientX+'px';
//				menu.style.top=e.clientY+'px';
//				div.className="file file-checked";
//			}else{
//				menu2.style.display="block";
//				menu2.style.left=e.clientX+'px';
//				menu2.style.top=e.clientY+'px';
//			}
//		}
//		
//		document.onmousemove =null;
//		return false;
//		e.cancelBubble=true;
//	}
//	content.onclick = function() {
//		console.log(1)
//		menu.style.display="none";
//	}
}
