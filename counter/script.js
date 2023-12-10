let countValue = document.getElementById('count');
let increaseBtn = document.getElementById('increment');
let decreaseBtn = document.getElementById('decrement');
let resetBtn = document.getElementById('reset');

let count = 0;

increaseBtn.addEventListener('click', function () {
    count++;
    countValue.textContent = String(count);
    if (count > 0) {
        countValue.style.color = 'green';
    } else if (count === 0) {
        countValue.style.color = 'black';
    }
})


resetBtn.addEventListener('click', function () {
    count = 0;
    countValue.textContent = String(count);
    countValue.style.color = 'black';
});


decreaseBtn.addEventListener('click', function () {
    if(count > 0) {

    count--;
    countValue.textContent = String(count);
    if (count < 0) {
        countValue.style.color = 'red';
    } else if (count === 0) {
        countValue.style.color = 'black';
    }

    }else {
        countValue.textContent = '0' ;
    }
})
