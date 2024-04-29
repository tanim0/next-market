import type { NextApiResponse } from "next"
import { ExtendedNextApiRequestUser, ResMessageType } from "../../../utils/types"
import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"

// req,resの型定義が必要
// reqはbodyを使っているのでその型定義が必要
// →含まれるべき型定義はユーザーデータの型定義なのでそれをtypes.tsの方で設定
const registerUser = async(req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) => {
  try{
    await connectDB()
    await UserModel.create(req.body)
    return res.status(200).json({message: "ユーザー登録成功"})
  }catch(err){
    return res.status(400).json({message: "ユーザー登録失敗"})
  }
}

export default registerUser