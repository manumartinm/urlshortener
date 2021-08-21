const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const router = require('./src/routes')

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use(router)

app.listen(PORT)