
  var container = document.getElementById('container'),
  btns = document.getElementById('btns'),
  input = document.getElementById('input'),
  numEles = container.getElementsByTagName('span'),//在元素上调用该方法，则只是查找该元素内部的符合元素，且返回的是一个动态的数据集合
  sortBtn = document.getElementById('sort');
  var numList=[],moveRecord = [];//moveRecord用来保存在排序的过程，numList来获得现有的插入的数字
//根据dom节点获得数组
function getNumList(){
  numList =[];
  for(var k=0;k<numEles.length;k++){
    numList.push(parseInt(numEles[k].innerHTML));
  }
}

//添加
function getInput(){
  var num = input.value;
  if(/^[0-9]+$/.test(num)&&parseInt(num)<=60&&parseInt(num)>=10){
    return num;
  }else{
    alert('请输入数字且在10到60之间');
  }
}
function render(num){
  var span = document.createElement('span');
  span.style.height=num+'px';
  span.innerHTML = num;
  return span;
}
function insert(dir){
 var num = getInput();
 if(numEles.length>=60){
  alert('已达到添加上限60，请先删除再添加');
  return;
   }
if(num && numEles.length<60){
  span = render(num);
  if(dir == 'left-in'){
    container.insertBefore(span,container.firstChild);
  }else if(dir == 'right-in'){
    container.appendChild(span);
  }  
  }
input.value='';
input.focus();
}
//删除
function remove(dir){
  if(numEles.length == 0){
    alert('没有可以删除的对象，请先添加');
    return false;
  }
  var removeEle;
  if(dir == 'right-out'){
    removeEle = container.lastChild;
  }else{
    removeEle = container.firstChild;
  }
  container.removeChild(removeEle);
  alert('删除'+removeEle.style.height.slice(0,-2));
}
//排序算法
function sort(arr){
  moveRecord=[];
  var tem;
  for(var i=0;i<arr.length-1;i++){
    for(var j=0;j<(arr.length-i-1);j++){
      var temRecord=[];
      if(arr[j]>arr[j+1]){
        tem = arr[j];
        arr[j]=arr[j+1];
        arr[j+1]=tem;
        temRecord[0]=j;
        temRecord[1]=arr[j];
        temRecord[2]=arr[j+1];
        moveRecord.push(temRecord);
      }
    }
  }
}

function sortEle(arr){
  var index=0;
  if(arr.length>0){
    moveEle();
  };
  function moveEle(){
    numEles[arr[index][0]].style.height=arr[index][1]+'px';
    numEles[arr[index][0]].innerHTML = arr[index][1];
    numEles[arr[index][0]+1].style.height=arr[index][2]+'px';
    numEles[arr[index][0]+1].innerHTML = arr[index][2];
    index++;
    if(index<arr.length){
      setTimeout(moveEle,1500);
    }
  }
}
//事件
btns.onclick = function(event){
  switch (event.target.id){
    case 'left-in':
    case 'right-in':
    insert(event.target.id);
    break;
    case 'left-out':
    case 'right-out':
    remove(event.target.id);
    break;
    default:
    return false;
  }
};
container.onclick=function(event){
  var deleEle = event.target;
  container.removeChild(deleEle);
}
sortBtn.onclick = function(){
  getNumList();
  sort(numList);
  sortEle(moveRecord);
}
