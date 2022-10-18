const express = require('express')
const app = express()
const port = 8080

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.send('type type!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
