import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"
import auth from "../../../utils/auth"

// データの修正にはItemModelに格納されたupdateOne()を使う
const updateItem = async(req, res) => {
  try{
    await connectDB()
    // db.collection.updateOne(filter, update, options)
    await ItemModel.updateOne({_id: req.query.id}, req.body)
    return res.status(200).json({message: "アイテム編集成功"})
  }catch(err){
    return res.status(400).json({message: "アイテム編集失敗"})
  }
  
}

export default auth(updateItem)