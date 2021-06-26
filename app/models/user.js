let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        pass: { type: String, required: true },
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('User', userSchema);
