const app = require('./app')
console.log('PORT:::', process.env.PORT)
const PORT = process.env.PORT || 3030

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})