import type { NextApiRequest } from "next"
import { Types } from "mongoose"

// ▼ schemaModels.ts
export interface ItemDataType {
  title: string
  image: string
  price: string
  description: string
  email: string
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

// ▼ readAll.ts, [id].ts, update/[id].ts, delete/[id].ts
// allItemの型定義はアイテムデータ＋アイテムデータをDB登録時に付与される「_id」
export interface SavedItemDataType extends ItemDataType {
  _id: Types.ObjectId 
}

// ▼ readAll.ts
// 結果によってフロントに返すレスポンスにallItemsが含まれている場合もあるのでそれも定義
export interface ResReadAllType {
  message: string
  allItems?: SavedItemDataType[]
}

// ▼ create.ts
export interface ExtendedNextApiRequestItem extends NextApiRequest {
  body: ItemDataType
}

// ▼ [id].ts
// ではmessage、singleItemの定義が必要singleItemは「ItemDataType+_id」なのでSavedItemDataTypeを使う
export interface ResReadSingleType {
  message: string
  singleItem?: SavedItemDataType
}

// Frontend
// ▼ [id].tsx, update/[id].tsx, delete/[id].tsx
export interface ReadSingleDataType {
  singleItem: {
    _id: string
    title: string
    image: string
    price: string
    description: string
    email: string
  }
}

// ▼ index.tsx
export interface ReadAllDataType {
  allItems: {
    _id: string
    title: string
    image: string
    price: string
    description: string
    email: string
  }[]
}