import connectDB from "../../utils/database"
import { ItemModel } from "../../utils/schemaModels"

const getAllItems = async(req, res) => {
  try{
    await connectDB() // MongoDBに接続 
    const allItems = await ItemModel.find() //DBから取得されたデータをallItemsに格納(ModelはMongoDBからデータの読み取りを行う機能を格納)
    return res.status(200).json({message: "アイテム読み取り成功(オール)", allItems: allItems}) // allItemsをjson形式に
  }catch(err){
    return res.status(400).json({message: "アイテム読み取り失敗(オール)"})
  }
}

export default getAllItems