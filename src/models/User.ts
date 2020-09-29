import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  username: string;
  password: string;
  email: string;
  lastName: string;
  fisrtName: string;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lastName: String,
  fisrtName: String,
})

const User = mongoose.model<UserDocument>('user', UserSchema)

export default User