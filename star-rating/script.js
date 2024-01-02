let container = document.querySelector('.star-container');
let star = document.querySelectorAll('.star');
let filled  = 0;

container.addEventListener('mouseover', (e) => {
    let currClicked = e.target.dataset.index;
    console.log(currClicked);
    for(let i = 0 ; i < filled; i++) {
        star[i].classList.remove("star-filled");
    }
    for(let i  = 0 ; i < currClicked;i++) {
        star[i].classList.add("star-filled")
    }
    document.getElementById('count').innerText =  `Count: ${currClicked}`
    filled = currClicked;
});
