const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const apiKey = '91d70150326268e00a45ddfd9600c755';  // 替换为你的OpenWeatherMap API密钥

// 允许跨域请求（如前端和后端在不同端口时）
app.use(express.static('public')); // 提供静态文件（前端HTML、CSS、JS）

// 天气API请求路由
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).send('City is required');
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        
        res.json({
            temperature: data.main.temp,
            humidity: data.main.humidity,
            description: data.weather[0].description
        });
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});