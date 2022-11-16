import mongoose = require('mongoose')
import { ModificationDetails } from '../../utils/common/model'

const todoSchema = new mongoose.Schema(
    {
        title: {type: String},
        status: Boolean,
        priority: Number,
        modificationDetails: ModificationDetails
    },
)

export default mongoose.model('todo', todoSchema)
