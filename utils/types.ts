import type { NextApiRequest } from "next"
import { Types } from "mongoose"

// ▼ schemaModels.ts
export interface ItemDataType {
  title: string,
  image: string,
  price: string
  description: string,
  email: string,
}

export interface UserDataType {
  name: string,
  email: string,
  password: string
}

// ▼ auth.ts
export interface DecodedType {
  email: string
}

// command押しながらプロパティ等クリックするとその型を定義しているコードが開かれる(req.bodyのbodyなど)
// reqのbodyにはどんなデータが入ってくるかわからないのでanyとされているため、自分でNextApiRequestを拡張し設定する
export interface ExtendedNextApiRequestAuth extends NextApiRequest {
  headers: {
    authorization: string
  },
  body: {
    email: string
  }
}

// ▼ Common (複数のファイルで使用)
// responseのmessageはmessage: "〜〜〜"としているのでstringとなっている(型推論)が、””がなかったら何のデータでも入ってくる状態なのでstringを設定する
export interface ResMessageType {
  message: string
  token?: string // 「?」でResMessageTypeの型定義を「tokenがあるものとないものがある」とする(messageはどの結果でも表示するがtokenはstatus(200)の時だけに入ってくる場合もあるので)
}

// ▼ register.te, login.ts
export interface ExtendedNextApiRequestUser extends NextApiRequest {
  body: UserDataType
}

// ▼ login.ts
// savedUserDataの型定義はUserDataType + MongoDB保存時に付与される_idに対する型定義が必要
export interface SavedUserDataType extends UserDataType {
  _id: Types.ObjectId  //Mongoose(MongoDBを操作するためのライブラリ)の用意している専用の型情報
}