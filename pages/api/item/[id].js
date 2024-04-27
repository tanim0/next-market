// [xxx].jsと名前をつけるとURLが何であってもそのファイルが実行(=[xxx].jsファイルは1つのフォルダ内に1つしか作れない)
// シングルデータのurlはデータを保存した時にMongoDBが自動で割り当ててくれる_idになるのでそれを取得する

import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels"

const getSingleItem = async(req, res) => {
  try{
    await connectDB() //dbへの接続処理を待つ
    // console.log(req.query.id) //　これがapi/item/移行の部分になる
    const singleItem = await ItemModel.findById(req.query.id) // ItemModelの中に格納されたfindById()を使用
    return res.status(200).json({message: "アイテム読み取り成功(シングル)", singleItem: singleItem})
  }catch(err){
    return res.status(400).json({message: "アイテム読み取り失敗(シングル)"})
  }
  
}

export default getSingleItem