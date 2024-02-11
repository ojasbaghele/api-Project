require('./middelwares/authMiddleware');
const routes = require('./routes/routes');
const sequelize = require('./dbconfig');
const sequelize = require('./dbconfig');
const { User, Client, Company,} = require('./models');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to server 3030 !');
})

app.use(bodyParser.json());

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});


sequelize.authenticate().then(()=>{ console.log('Connected To MySQl')})
                        .catch((err)=>{ console.log(err) });
                     
User.sync()
.then(() => {
  console.log('User tables Alterded successfully');
}).catch((err)=>{ console.log("err_User") });

Client.sync()
.then(() => {
  console.log('Client tables Alterded successfully');
}).catch((err)=>{ console.log("err_Client") });

Company.sync()
.then(() => {
  console.log('Company tables Alterded successfully');
}).catch((err)=>{ console.log("err_Company") });


app.listen(3030);