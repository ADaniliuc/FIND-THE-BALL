'use strict'

const start = document.querySelector('.startStatus');
const btnStart = document.querySelector('#start')
const movements = document.querySelector('#movements');
const status = document.querySelector('.status');
const field = document.querySelector('.field');
const ball = document.getElementById('ball');
const ballRadius = 5;
let counter = 0;
let crosses = [];

let positionBallWidth, positionBallHeight;

const percentPositionBall = (value, value1) => +(100 * value / value1).toFixed(1);
const positionBall = (axa) => Math.trunc(Math.random() * +axa);

const starting = function (e) {
    e.preventDefault();
    start.classList.toggle('hidden');
    positionBallWidth = positionBall(field.clientWidth);
    positionBallHeight = positionBall(field.clientHeight);
    const percentPositionBallWidth = percentPositionBall(positionBallWidth, field.clientWidth)
    const percentPositionBallHeight = percentPositionBall(positionBallHeight, field.clientHeight)
    ball.style.width = `${ballRadius}rem`;
    ball.style.left = `${percentPositionBallWidth}%`;
    ball.style.top = `${percentPositionBallHeight}%`;
    counter = 0;
    movements.innerHTML = counter;
    status.innerHTML = 'GO';
    ball.style.backgroundColor = 'inherit'
    crosses.forEach(el => el.remove())
};

const createCross = function (x, y) {
    const newCross = document.createElement('p')
    newCross.style.left = `${x}px`;
    newCross.style.top = `${y}px`;
    field.prepend(newCross);
    return newCross
};

field.addEventListener('click', function (e) {
    let positionCursorWidth = +e.offsetX;
    let positionCursorHeight = +e.offsetY;
    if (e.target.id === '') {
        counter++;
        movements.innerHTML = counter;

        if (positionCursorWidth <= (positionBallWidth + (field.clientWidth / 10)) &&
            positionCursorWidth >= (positionBallWidth - (field.clientWidth / 10)) &&
            positionCursorHeight <= (positionBallHeight + (field.clientWidth / 10)) &&
            positionCursorHeight >= (positionBallHeight - (field.clientWidth / 10))) {
            status.innerHTML = `HOT 🥵`;
        } else if (positionCursorWidth <= (positionBallWidth + (field.clientWidth / 5)) &&
            positionCursorWidth >= (positionBallWidth - (field.clientWidth / 5)) &&
            positionCursorHeight <= (positionBallHeight + (field.clientWidth / 5)) &&
            positionCursorHeight >= (positionBallHeight - (field.clientWidth / 5))) {
            status.innerHTML = `WARM 😎`;
        } else if (positionCursorWidth <= (positionBallWidth + (field.clientWidth / 2)) &&
            positionCursorWidth >= (positionBallWidth - (field.clientWidth / 2)) &&
            positionCursorHeight <= (positionBallHeight + (field.clientWidth / 2)) &&
            positionCursorHeight >= (positionBallHeight - (field.clientWidth / 2))) {
            status.innerHTML = `COOL 😐`;
        } else {
            status.innerHTML = `COLD 🥶`;
        }

        crosses.push(createCross(positionCursorWidth, positionCursorHeight));
    };
    if (e.target.id === 'ball') {
        counter++;
        movements.innerHTML = counter;
        start.classList.toggle('hidden');
        start.firstElementChild.innerHTML = `Congratulation ${counter} move${counter === 1 ? '' : 's'}`;
        status.innerHTML = `🥳`;
        ball.style.backgroundColor = 'red';
    };
});

btnStart.addEventListener('click', starting);
