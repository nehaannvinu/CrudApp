import * as mongoose from 'mongoose'
import { ModificationDetails } from '../../utils/common/model'

const Schema = mongoose.Schema

const schema = new Schema(
  {
    username: String,
    name: {
      type: {
        first_name: String,
        middle_name: String,
        last_name: String,
      },
    },
    email: String,
    phone_number: String,
    gender: String,
    modification_details: ModificationDetails,
  },
  {
    versionKey: false,
  },
)

export default mongoose.model('users', schema)
