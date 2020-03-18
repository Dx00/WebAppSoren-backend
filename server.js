const express = require('express')

const app = require('./src/app')
const port = process.env.PORT || 3009
const baseDir = `${__dirname}/client/build/`

app.use(express.static(`${baseDir}`))

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: baseDir})
})

app.listen(port, () => {
  console.log(`API rodando na porta ${port}/localhost:${port}`);
});
