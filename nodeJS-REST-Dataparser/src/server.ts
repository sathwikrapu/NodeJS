import App from './app'

import * as bodyParser from 'body-parser'
import requestLogger from './middleware/logger'
import PostsController from './controllers/posts/posts.controller'

const app = new App({
    port: 5000,
    controllers: [

        new PostsController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        requestLogger
    ]
})

app.listen();