import type { NextApiRequest } from "next"

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
}