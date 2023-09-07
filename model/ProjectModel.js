import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    view: {
        type: String,
        // required: true
    },
    source: {
        type: String,
        // required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },

},{timestamps:true});

export default mongoose.model('Project',projectSchema)