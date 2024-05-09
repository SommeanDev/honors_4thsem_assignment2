import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const postSchema = new Schema({
    author: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String},
}, { 
    timestamps: true 
});

postSchema.plugin(uniqueValidator);

export default model('Post', postSchema);