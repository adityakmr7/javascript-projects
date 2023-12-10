const RANDOM_COLOR_ARRAY = ["red", "green", "blue", "yellow", "pink", "purple", "orange", "brown", "black", "white"];

const btn = document.getElementById('btn_color_change')

const getRandomNumber = () => {
    return Math.floor(Math.random() * RANDOM_COLOR_ARRAY.length)
}

btn.addEventListener('click', function () {
    const randomNumber = getRandomNumber()
    document.body.style.backgroundColor = RANDOM_COLOR_ARRAY[randomNumber]
    document.getElementById('color_value').textContent = RANDOM_COLOR_ARRAY[randomNumber];
})
