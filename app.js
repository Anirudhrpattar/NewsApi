const express = require('express');
const { engine } = require('express-handlebars');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

const apiKey = '86e36cc047cb4b2d95f475291b6c287b';
const apiUrl = 'http://newsapi.org/v2/top-headlines';
const country = 'us'; // Change this to your desired country code
const pageSize = 5;   // Number of news articles to fetch

const requestOptions = {
    params: {
        country,
        pageSize,
        apiKey,
    }
};

// Configure Handlebars as the view engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

// Route to fetch news and render it using Handlebars
app.get('/', (req, res) => {
    axios.get(apiUrl, requestOptions)
        .then(response => {
            const articles = response.data.articles;
            res.render('news', { articles, title: 'News Headlines' });
        })
        .catch(error => {
            console.error('Error fetching news:', error.message);
            res.render('error', { title: 'Error' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});