// MongoDBとの接続をするファイル
// JSとMongoDBの接続ではmongooseというパッケージよく使われる(Shema,Model)
import mongoose from "mongoose";

const connectDB = () => {
  try {
    // mongodb.net/と?の間に「appDataBase」とデータベース名書いている
    mongoose.connect("mongodb+srv://tanim0:<ZAr35IvkYTzdUeVS>@tanim0.yyqyc1e.mongodb.net/appDataBase?retryWrites=true&w=majority&appName=tanim0")
    console.log("Success: Connected to MangoDB")
  } catch(err) {
    console.log("Failure: Unnconnected to MangoDB")
    throw new Error() // エラーが発生したことを知らせる
  }
}

export default connectDB