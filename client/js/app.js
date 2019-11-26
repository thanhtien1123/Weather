let url = 'http://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = "bb8296132e5fd5c7923c907004c3e923";

document.querySelector("#generate").addEventListener('click', (e) => {
    e.preventDefault();     
    let zip = document.getElementById("zip").value;
    let feelings = document.querySelector("#feelings").value;

    getWeather(url, zip, apiKey)
        .then((data) => {
            const date =  new Date();
            const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let month = date.getMonth() + 1;
            if(month === 1) {
                month = monthList[0];
            } else if(month === 2) {
                month = monthList[1];
            } else if(month === 3) {
                month = monthList[2];
            } else if(month === 4) {
                month = monthList[3];
            } else if(month === 5) {
                month = monthList[4];
            } else if(month === 6) {
                month = monthList[5];
            } else if(month === 7) {
                month = monthList[6];
            } else if(month === 8) {
                month = monthList[7];
            } else if(month === 9) {
                month = monthList[8];
            } else if(month === 10) {
                month = monthList[9];
            } else if(month === 11) {
                month = monthList[10]
            } else {
                month = monthList[11]
            }

            let showDate = ` Today is ${month} ${date.getDate()}, ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`
            postWeather('/addWeather', {
                name: data.name, 
                date: showDate, 
                temp: `It is ${data.main.temp} degrees outside`, 
                content: feelings
            })
        })
        .then(updateUI())
})

//Async GET
const getWeather = async(url, zip, apiKey) => {
    const res = await fetch(`${url}${zip},us&units=imperial&appid=${apiKey}`)
    try {
        const data = await res.json();        
        return data;
    } catch (error) {
        console.log('error', error);     
    }
}

const updateUI = async() => {
    const res = await fetch('/all');
    try {
        const allData = await res.json();  
        document.querySelector("#name").innerHTML = allData[allData.length - 1].name;
        document.querySelector("#date").innerHTML = allData[allData.length - 1].date;
        document.querySelector("#temp").innerHTML = allData[allData.length - 1].temp;
        document.querySelector("#content").innerHTML = `You are feeling ${allData[allData.length - 1].content}`;
    } catch(error) {
        console.log('error', error);
    }
}

//ASYNC POST
const postWeather = async(url, data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        return newData;
    } catch(error) {
        console.log('error', error);
    }
}

