const mongoose = require("mongoose");

const researchSessionSchema = new mongoose.Schema({
    query: String,
    user_id:String,
  }, {
    collection: 'research_memory',
    versionKey: false,
});
module.exports = mongoose.model("ResearchMemory", researchSessionSchema);
