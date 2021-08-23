const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

const errorController = require('./src/controllers/error')

const router = require('./src/routes')

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use(router)

app.use(errorController.get404)

app.listen(PORT)
