import connectDB from "../../utils/database"
import { ItemModel } from "../../utils/schemaModels"
import auth from "../../utils/auth"

const createItem = async(req, res) => {
  try{
    await connectDB()
    await ItemModel.create(req.body) // ItemModelを使ってMongoDBに書き込み
    return res.status(200).json({message: "アイテム作成成功"})
  } catch(err) {
    return res.status(400).json({message: "アイテム作成失敗"})
  }
}

// このファイルのコードが実行される前にauthが実行される
export default auth(createItem)

// フロントエンド(form.html)から投稿されたデータはreqのbodyに含まれてcreate.jsに渡されている
// (titleはinputのname属性と対応)