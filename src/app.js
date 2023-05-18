const express = require ('express')
const morgan = require('morgan')
const cors = require("cors");

const app = express()


app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(require("./routes/Register/register"))
app.use(require("./routes/Login/login"))
app.use(require("./routes/Recover/recover"))
app.use(require("./routes/Perfil/perfil"))
app.use(require("./routes/RegisterSpend/registerSpend"))
app.use(require("./routes/tableSpend/tableSpend"))


module.exports = app;