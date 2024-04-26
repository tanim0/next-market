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

export const ItemModel = mongoose.models.Item|| mongoose.model("Item", ItemSchema)