const Express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');

// Init app
const app = Express();

app.use(webpackDevMiddleware(webpack(config), {
    hot: true,
    publicPath: config.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(webpack(config)));

const publicPath = Express.static(path.resolve(__dirname, './dist'));
app.use('/dist', publicPath);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(3000, () => {
    console.log(`Listening at ->  http://localhost:${3000}`);
});