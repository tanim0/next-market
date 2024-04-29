// [xxx].jsと名前をつけるとURLが何であってもそのファイルが実行(=[xxx].jsファイルは1つのフォルダ内に1つしか作れない)
// シングルデータのurlはデータを保存した時にMongoDBが自動で割り当ててくれる_idになるのでそれを取得する

import type { NextApiRequest, NextApiResponse } from "next"
import { SavedItemDataType, ResReadSingleType } from "../../../utils/types"
import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"

// resを見るとsigleitemが含まれるものがあるのでtypes.tsで新しく型定義
const getSingleItem = async(req: NextApiRequest, res: NextApiResponse<ResReadSingleType>) => {
  try{
    await connectDB() //dbへの接続処理を待つ
    // console.log(req.query.id) //　これがapi/item/移行の部分になる
    const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id) // ItemModelの中に格納されたfindById()を使用
    // null(singleItemがn¥存在していないケースに対応)
    if(!singleItem) return res.status(400).json({message: "アイテムが存在していないため読み取り失敗"})
    return res.status(200).json({message: "アイテム読み取り成功(シングル)", singleItem: singleItem})
  }catch(err){
    return res.status(400).json({message: "アイテム読み取り失敗(シングル)"})
  }
  
}

export default getSingleItem