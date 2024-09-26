const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    image: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    designation: {
        type: String,
    },
    gender: {
        type: String,
    },
    course: {
        type: String,
    },
    createDate: {
        type: Date
    },
    adminUserId: {
        type: Schema.Types.ObjectId,
        ref: 'Login'
    }
});

module.exports = mongoose.model('Employee', employeeSchema);