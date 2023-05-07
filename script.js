'use strict'

const start = document.querySelector('.startStatus');
const btnStart = document.querySelector('#start')
const movements = document.querySelector('#movements');
const status = document.querySelector('.status');
const field = document.querySelector('.field');
const ball = document.getElementById('ball');

let counter = 0;
let crosses = [];
let positionBallWidth, positionBallHeight;

const percentPositionBall = (value, value1) => +(100 * value / value1).toFixed(1);
const positionBall = (length, ballRadius) => Math.trunc((Math.random() * (+length - (ballRadius * 2))) + ballRadius);

const starting = function (e) {
    e.preventDefault();
    const ballR = Math.ceil(window.innerWidth / 320);
    start.classList.toggle('hidden');
    ball.style.width = `${ballR}rem`;
    positionBallWidth = positionBall(field.clientWidth, ballR);
    positionBallHeight = positionBall(field.clientHeight, ballR);
    const percentPositionBallWidth = percentPositionBall(positionBallWidth, field.clientWidth)
    const percentPositionBallHeight = percentPositionBall(positionBallHeight, field.clientHeight)
    ball.style.left = `${percentPositionBallWidth}%`;
    ball.style.top = `${percentPositionBallHeight}%`;
    counter = 0;
    movements.innerHTML = counter;
    status.innerHTML = 'GO';
    ball.style.backgroundColor = 'inherit'
    ball.style.zIndex = '1';
    crosses.forEach(el => el.remove())
};

const createCross = function (x, y) {
    const newCross = document.createElement('p')
    newCross.style.left = `${x}px`;
    newCross.style.top = `${y}px`;
    newCross.style.height = `${parseInt(ball.style.width) / 3}rem`;
    field.prepend(newCross);
    return newCross
};


field.addEventListener('click', function (e) {
    let positionCursorWidth = +e.offsetX;
    let positionCursorHeight = +e.offsetY;

    const positonDevHelper = (dev) => {
        const maxDimension = Math.max(field.clientWidth, field.clientHeight);
        return positionCursorWidth <= (positionBallWidth + (maxDimension / dev)) &&
            positionCursorWidth >= (positionBallWidth - (maxDimension / dev)) &&
            positionCursorHeight <= (positionBallHeight + (maxDimension / dev)) &&
            positionCursorHeight >= (positionBallHeight - (maxDimension / dev))
    };
    if (e.target.id === '') {
        counter++;
        movements.innerHTML = counter;

        if (positonDevHelper(10)) {
            status.innerHTML = `HOT 🥵`;
        } else if (positonDevHelper(5)) {
            status.innerHTML = `WARM 😎`;
        } else if (positonDevHelper(2)) {
            status.innerHTML = `COOL 😨`;
        } else {
            status.innerHTML = `COLD 🥶`;
        }

    };
    if (e.target.classList.contains('field')) {
        crosses.push(createCross(positionCursorWidth, positionCursorHeight));
    };

    if (e.target.id === 'ball') {
        counter++;
        movements.innerHTML = counter;
        start.classList.toggle('hidden');
        start.firstElementChild.innerHTML = `Congratulation ${counter} move${counter === 1 ? '' : 's'}`;
        status.innerHTML = `🥳`;
        ball.style.backgroundColor = 'red';
        ball.style.zIndex = '999';
    };
});

btnStart.addEventListener('click', starting);
