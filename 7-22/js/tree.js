//处理数据

//根据数据渲染页面
function render(dat) {
	content.innerHTML = '';//每次渲染页面都先清空页面
	elements = [];
	for(var i=0;i<dat.length;i++) {
		creatFiles(dat[i]);
	}
}

//确定文件夹是否是选中状态
/*
 * @param fileElement  要设置状态的元素
 * @param status  要设置的状态，true表示选中，false表示未选中
 * @param classname  设置未选中的时候的class，默认为file
 * */
function setStatus(fileElement,status,classname) {
	var className = classname || 'file';
	fileElement.checked = status;//自定义属性
	fileElement.className = status ? 'file file-checked' : className;
}

//获取某个id元素的所有子集
function getChildren(id) {
	var arr = [];
	for(var i=0;i<datas.length;i++) {
		if(datas[i].pid == id) {
			arr.push(datas[i])
		}
	}
	return arr;
}


//获取最大id值
function getMaxid() {
	var maxId = 0;
	for(var i=0;i<datas.length;i++) {
		if(datas[i].id > maxId ) {
			maxId = datas[i].id;
		}
	}
	return maxId;
}

//获取选中元素
function getChecked() {
	var arr = [];
	for(var i=0;i<elements.length;i++) {
		if(elements[i].checked) {
			arr.push(elements[i]);
		}
	}
	return arr;
}
/*
* 根据id获取信息
* */
function getInfo(id) {
    for (var i=0; i<datas.length; i++) {
        if (datas[i].id == id) {
            return datas[i];
        }
    }
}
/*
* 获取父级
* */
function getParent(id) {
    var info = getInfo(id);
    if (info) {
        return getInfo(info.pid);
    }
}
/*
* 获取所有父级
* */
function getParents(id) {
    var arr = [];
    var parent = getParent(id);
    if (parent) {
        arr.push(parent);
        arr = arr.concat( getParents(parent.id) );
    }
    return arr;
}
function showBreadcrumb() {
        var parentList = getParents(currentPid);
        if ( getInfo(currentPid) ) {
            parentList.unshift( getInfo(currentPid) );
        }
        var html = '';
        for (var i=parentList.length-1; i>=0; i--) {
            html += ' > <a fileId="'+ parentList[i].id +'" href="javascript:;">'+ parentList[i].name +'</a>';
        }
        breadcrumbList.innerHTML = html;
    }