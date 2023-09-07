import chalk from 'chalk'
import app from './server/app.js'
import { mongoConnect } from './config/db_config.js';
const PORT = 8080;


mongoConnect.then(() => {
    app.listen(PORT, () => {
        console.log(chalk.bgGreen(`Server is running on port ${PORT}`));
    })
}).catch(err => {
    console.log("Something went wrong in DB connection...please check the connection", err.message);
})






