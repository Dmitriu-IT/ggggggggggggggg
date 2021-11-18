const schema = mongoose.Schema({
    guildID: String,
    userID: String,
    
    money: { type: Number, default: 0 },
    bio: { type: String, default: `Биография не указана.` },
    _time: { type: Date, default: 0 },
    pmpartners: { type: Number, default: 0 },
    messages: { type: Number, default: 0 },
    privoice: { type: String, default: '0' }
});
module.exports = mongoose.model("User", schema)
