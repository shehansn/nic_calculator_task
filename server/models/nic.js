const mongoose = require('mongoose');

const nicSchema = new mongoose.Schema({
    nic: {
        type: String,
        required: true,
    }

});

nicSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

nicSchema.set('toJSON', {
    virtuals: true,
});

exports.Nic = mongoose.model('Nic', nicSchema);
exports.nicSchema = nicSchema;
