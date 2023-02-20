const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
    channelName: {
        type: String
    },
    programmeTitle: {
        type: String
    },
    programmeDate: {
        type: Date
    },
    broadcastTime: {
        type: String
    },
    complaint: {
        type: String
    },
    formalTitle: {
        type: String
    },
    firstName: {
        type: String
    },
    surName: {
        type: String
    },
    address: {
        type: String
    },
    mobileNo: {
        type: Number
    },
    phoneNo: {
        type: Number
    },
    email: {
        type: String
    },
    complaintDate: {
        type: Date
    },
    rplyBody: {
        type: String
    }
},

    { timestamps: true }

);
const Complaint = mongoose.model('Complaint', ComplaintSchema);
module.exports = Complaint;