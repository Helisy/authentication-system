if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('public'));

// Routers
const authRouter = require('./src/routes/auth');
app.use("/auth", authRouter);
/***/

const PORT = process.env.PORT;
const hostName = process.env.HOSTNAME;


app.set('view engine', 'ejs');

app.get('/', (req, res) => {

})

app.listen(PORT, hostName, () => {
    console.log(`Server listening on ip ${hostName} and port ${PORT}`);
  });
