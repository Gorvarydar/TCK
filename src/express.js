const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000

const ap = express()
ap.use(express.static(__dirname))
ap.use(express.static(path.resolve(__dirname, "build")))


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "build", index.html))
})

app.listen(PORT)