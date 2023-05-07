'use strict'

const start = document.querySelector('.startStatus');
const btnStart = document.querySelector('#start')
const movements = document.querySelector('#movements');
const status = document.querySelector('.status');
const field = document.querySelector('.field');
const ball = document.getElementById('ball');
const reload = document.querySelector('.reload');
const maxDimension = Math.max(field.clientWidth, field.clientHeight);

let counter = 0;
let crosses = [];
let positionBallWidth, positionBallHeight;

const percentPositionBall = (value, value1) => +(100 * value / value1).toFixed(1);
const positionBall = (length, ballRadius) => Math.trunc((Math.random() * (length - (ballRadius * 2))) + ballRadius);

const starting = function (e) {
    e.preventDefault();
    const ballR = Math.ceil(maxDimension / 280);
    start.classList.add('hidden');
    ball.style.width = `${ballR}rem`;
    positionBallWidth = positionBall(field.clientWidth, parseInt(ball.style.width));
    positionBallHeight = positionBall(field.clientHeight, parseInt(ball.style.width));
    const percentPositionBallWidth = percentPositionBall(positionBallWidth, field.clientWidth)
    const percentPositionBallHeight = percentPositionBall(positionBallHeight, field.clientHeight)
    ball.style.left = `${percentPositionBallWidth}%`;
    ball.style.top = `${percentPositionBallHeight}%`;
    counter = 0;
    movements.innerHTML = String(counter).padStart(2, '0');
    status.innerHTML = 'FIND 🔴';
    ball.style.backgroundColor = 'inherit'
    ball.style.zIndex = '1';
    crosses.forEach(el => el.remove())
    field.addEventListener('click', finderPositions);
};

const createCross = function (x, y) {
    const newCross = document.createElement('p')
    newCross.style.left = `${x}px`;
    newCross.style.top = `${y}px`;
    newCross.style.height = `${parseInt(ball.style.width) / 2}rem`;
    field.prepend(newCross);
    return newCross
};

const finderPositions = function (e) {
    let positionCursorWidth = +e.offsetX;
    let positionCursorHeight = +e.offsetY;

    const positonDevHelper = (dev) => {
        return positionCursorWidth <= (positionBallWidth + (maxDimension / dev)) &&
            positionCursorWidth >= (positionBallWidth - (maxDimension / dev)) &&
            positionCursorHeight <= (positionBallHeight + (maxDimension / dev)) &&
            positionCursorHeight >= (positionBallHeight - (maxDimension / dev))
    };
    if (e.target.id === '') {
        counter++;
        movements.innerHTML = String(counter).padStart(2, '0');

        if (positonDevHelper(8)) {
            status.innerHTML = `HOT 🥵`;
        } else if (positonDevHelper(4)) {
            status.innerHTML = `WARM 😐`;
        } else {
            status.innerHTML = `COLD 🥶`;
        }

    };
    if (e.target.classList.contains('field')) {
        crosses.push(createCross(positionCursorWidth, positionCursorHeight));
    };

    if (e.target.id === 'ball') {
        counter++;
        movements.innerHTML = String(counter).padStart(2, '0');
        start.classList.remove('hidden');
        start.firstElementChild.innerHTML = `Congratulation ${counter} move${counter === 1 ? '' : 's'}`;
        status.innerHTML = `🥳`;
        ball.style.backgroundColor = 'red';
        ball.style.zIndex = '999';
        field.removeEventListener('click', finderPositions)
    };
}

btnStart.addEventListener('click', starting);
reload.addEventListener('click', starting);
