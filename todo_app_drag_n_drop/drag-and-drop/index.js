
const input = document.querySelector('.create_todo_input');
const btn = document.querySelector('.create_todo_btn');

btn.addEventListener('click', () => {
    let li = document.createElement('li');
    li.textContent = input.value;
    li.className = "todo_list"
    li.draggable = true;
    li.addEventListener('dragstart', handleDragStart);
    li.addEventListener('dragend', handleDragEnd);

    const listContainer = document.querySelector('.list_container');
    
    listContainer.appendChild(li);

})
let dragSrcEl =null;
const items = document.querySelectorAll('.todo_list');

items.forEach((item) => {
    item.addEventListener('dragstart', handleDragStart)
    item.addEventListener('dragover',handleDragOver);
    item.addEventListener('dragenter',handleDragEnter);
    item.addEventListener('dragleave', handleDragLeave);
    item.addEventListener('drop',handleDrop);
})


function handleDragStart(e){
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    console.log('inner', this);
    e.dataTransfer.setData('text/html',this);
}
function handleDragEnd(e) {}
function handleDragOver(e){
    e.preventDefault();
    return false;
}
function handleDragEnter(e) {

}
function handleDragLeave(e) {

}

function handleDrop(e) {
    e.stopPropagation();
    if(dragSrcEl !== this) {
        dragSrcEl = this;
       const todo =  document.querySelector('.todo_container')
       todo.appendChild(this);
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;
}