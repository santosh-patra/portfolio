import mongoose from 'mongoose';

const URL = process.env.URL;
let mongoConnect = mongoose.connect(URL);


export { mongoConnect };
