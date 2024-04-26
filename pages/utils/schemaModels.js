// Shemaを作り保存するデータの形をあらかじめ定める

import mongoose from "mongoose";

const Schema = mongoose.Schema

const ItemSchema = new Schema({
  title: String,
  image: String,
  price: String, String,
  description: String,
  email: String,
})

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  email: { // メールアドレスは全て異なるもの、必須(required:trueだと空欄ではDBに保存不可になる)
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// ModelはMongoDBからデータの読み取りを行う機能を格納
export const ItemModel = mongoose.models.Item|| mongoose.model("Item", ItemSchema)

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)