import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";
import auth from "../../../utils/auth";

// データの柵書にはItemModelに格納されたdeleteOne()を使う
const deleteItem = async(req, res) => {
  try{
    await connectDB()
    await ItemModel.deleteOne({_id: req.query.id})
    return res.status(200).json({message: "アイテム削除成功"})
  }catch(err){
    return res.status(400).json({message: "アイテム削除失敗"})
  }
}

export default auth(deleteItem)