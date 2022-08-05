const display = document.getElementById('clock');
const container = document.getElementById('container-box');
let isRinging = false;

// Setting audio for alarm
const audio = new Audio('https://assets.mixkit.co/sfx/download/mixkit-digital-clock-digital-alarm-buzzer-992.wav');
audio.loop = true;

const myList = document.querySelector('#myList');
const addAlarm = document.querySelector('.setAlarm')
const alarmTime = document.getElementById('alarmTime');
const alarmList = [];  // To store multiple alarms 
const pauseBtn = document.getElementById("pause-Btn");

// To convert "1:2:3" into "01:02:03"
function formatTime(time) {
    if (time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}

// To play alarm at correct time
function ringing(now) {
    audio.play();
    let hour = now.slice(0, 2);
    let minutes = now.slice(3);
    const cur = `${hour}:${minutes}`;
    pauseBtn.addEventListener('click', function () {
        let index = alarmList.indexOf(cur);
        alarmList.splice(index, 1);
        audio.pause();   
        function reInsert(){
        alarmList.push(cur);
        }
        setInterval(reInsert, 60000);
    })
}

// For updating time every second 
function updateTime() {
    var today = new Date();
    const hour = formatTime(today.getHours());
    const minutes = formatTime(today.getMinutes());
    const seconds = formatTime(today.getSeconds());
    const now = `${hour}:${minutes}`;
    display.innerText = `${hour}:${minutes}:${seconds}`;

    // To check if the alarmList contains any current time alarm
    if (alarmList.includes(now)) {
        isRinging = true;
        ringing(now);
    }
}

//To Remove an alarm from the unordered list and the webpage when "Delete Alarm" is clicked
myList.addEventListener('click', e => {
    if (e.target.classList.contains("deleteAlarm")) {
        e.target.parentElement.remove();
    }
})
//To Remove an alarm from the array when "Delete Alarm" is clicked
remove = (value) => {
    let newList = alarmList.filter((time) => time != value);
    alarmList.length = 0;                  // Clear alarm contents
    alarmList.push.apply(alarmList, newList);
}

addAlarm.addEventListener('click', function () {
    if (alarmTime.value == '') {
        alert('Please enter Time')
    }
    else {
        let new_h = alarmTime.value.slice(0, 2);
        let new_m = alarmTime.value.slice(3);
        const newAlarm = `${new_h}:${new_m}`
        if (alarmList.includes(newAlarm)) {
            alert('Alarm for this time is already set');

        } else {
            alarmList.push(newAlarm);
            const add = `
          <li class = "time-list">        
          <span class="time btn btn-success">${alarmTime.value}</span>
          <button class="btn btn-danger deleteAlarm " id="delete-button" onclick = "remove(this.value)" value=${alarmTime.value}>Delete Alarm</button>       
          </li>`
            myList.innerHTML += add;


        }
    }
})

setInterval(updateTime, 1000);