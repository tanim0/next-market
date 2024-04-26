// ログイン機能は
// その人が登録を済ませているかチェック(DBからユーザーデータを取得しその人がすでに登録しているか調べる)
// 登録を済ませている場合はpasswordが正しいかチェック

import connectDB from "../../utils/database"
import { UserModel } from "../../utils/schemaModels"

const loguinUser = async(req, res) => {
  try{
    await connectDB()
    const savedUserData = await UserModel.findOne({email: req.body.email})
    
    if(savedUserData) {
      // ユーザーデータが存在する場合の処理
      if(req.body.password === savedUserData.password) {
        // パスワードが正しい場合の処理
        return res.status(200).json({"message": "ログイン成功"})
      } else {
        return res.status(400).json({"message": "ログイン失敗(パスワードが間違っています)"})
      }
    } else {
      // ユーザーデータが存在しない場合の処理
      return res.status(400).json({"message": "ログイン失敗(ユーザー登録をしてください)"})
    }
  }catch(err){
    return res.status(400).json({"message": "ログイン失敗"})
  }
}

export default loguinUser