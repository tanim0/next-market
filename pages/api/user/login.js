import jwt from "jsonwebtoken"
import connectDB from "../../utils/database"
import { UserModel } from "../../utils/schemaModels"

// ログインを維持する仕組みとして今回はトークン方式を使う(セッション方式もある)
// jsonwebtokenはトークンを発行するjwt.sign()と
// ログイン後のリクエスト時にトークンの有効性を検証するjwt.verify()をセットで使う

// jwt.sign(ペイロード(トークンに含ませたいデータ。ユーザー名やメールアドレスなどを入れる),シークレットキー,有効期限)
const secret_key = "nextmarket" // シークレットキー設定

// ログイン機能は
// その人が登録を済ませているかチェック(DBからユーザーデータを取得しその人がすでに登録しているか調べる)
// 登録を済ませている場合はpasswordが正しいかチェック
const loguinUser = async(req, res) => {
  try{
    await connectDB()
    const savedUserData = await UserModel.findOne({email: req.body.email})
    
    if(savedUserData) {
      // ユーザーデータが存在する場合の処理
      if(req.body.password === savedUserData.password) {
        // パスワードが正しい場合の処理

        // ログイン成功した場合にペイロードにメールアドレスを入れトークン発行
        const payload = {
          email: req.body.email,
        }
        const token = jwt.sign(payload, secret_key, {expiresIn: "23h"})
        // tokenはLocalStrageに保存される

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