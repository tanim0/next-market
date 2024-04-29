import type { NextApiResponse } from "next"
import { ExtendedNextApiRequestItem, SavedItemDataType, ResMessageType} from "../../../../utils/types"
import connectDB from "../../../../utils/database"
import { ItemModel } from "../../../../utils/schemaModels"
import auth from "../../../../utils/auth"

// アイテムデータの修正はトークンの確認が間に入るのでExtendedNextApiRequestAuth定義を使用
const updateItem = async(req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) => {
  try{
    await connectDB()
    // 編集しようとしているアイテムデータをsingleItemに格納
    const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id)
    // | nullに対応
    if(!singleItem) return res.status(400).json({message: "アイテムが存在していないため編集失敗"})
    // sincleItemに入っているemail(商品登録時入力)とreq.bodyに入っているemailを比較し、同一の場合だけ修正処理を実行
    if(singleItem.email === req.body.email) {
      // データの修正にはItemModelに格納されたupdateOne()を使う
      // db.collection.updateOne(filter, update, options)
      await ItemModel.updateOne({_id: req.query.id}, req.body)
      return res.status(200).json({message: "アイテム編集成功"})
    } else {
      throw new Error()
    }
  }catch(err){
    return res.status(400).json({message: "アイテム編集失敗"})
  }
}

export default auth(updateItem)