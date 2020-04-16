var temperature = 75

if(temperature > 100) {
    console.log("It is Hot!")
} else {
    console.log("At least it's not too hot!")
}

const http = require('http')

var url = `http://api.openweathermap.org/data/2.5/weather?zip=20148&appid=d0aafec2fb2b6507f37d4090fc7a8962`

http.get(url, resp => {
    resp.on('data', d => {
        process.stdout.write(d['main'])
    })
})
