// auth.js=ミドルウェア([id].jsのように特定のurlを持ったものでなく、urlを持ったファイルの機能を補助する。(これらのファイルが実行される前にトークンを確認し、ログイン状態を調べる))

// req,resの型定義に使用(req,resにはさまざまな情報が含まれるがその型定義Next.jsがしておいてくれている)
import type { NextApiRequest, NextApiResponse } from "next"

import jwt from "jsonwebtoken"

interface DecodedType {
  email: string
}

// command押しながらプロパティ等クリックするとその型を定義しているコードが開かれる(req.bodyのbodyなど)
// reqのbodyにはどんなデータが入ってくるかわからないのでanyとされているため、自分でNextApiRequestを拡張し設定する
interface ExtendedNextApiRequestAuth extends NextApiRequest {
  headers: {
    authorization: string
  },
  body: {
    email: string
  }
}

// responseのmessageはmessage: "〜〜〜"としているのでstringとなっている(型推論)が、””がなかったら何のデータでも入ってくる状態なのでstringを設定する
interface ResMessageType {
  message: string
}

const secret_key = "nextmarket"

// auth.jsはcreateItem,updateItem,deleteIttemを一度内部に受け取る(handler(任意))
// handlerの型定義・・・アイテムの作成や編集といった操作実行の前にauth.jsを通過させるもの。つまりhandlerはcreate.jsや/update/[id].jsといった何らかの働きをするもの(=function)
const auth = (handler: Function) => {
  return async(req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>) => {
    // リクエストの種類の判別
    // GETの場合はログイン判定不要なのでこれ以上処理を進めない
    // また、form.html等では<form>はGET,POSTしか使えないのでPOSTを設定し、Modelに格納された機能で実際の処理を行っている
    if(req.method === "GET") {
      return handler(req, res)
    }

    // フロントエンドから送られたリクエストのheadersからトークンを取得
    const token = await req.headers.authorization.split(" ")[1] //「Bearer トークン文字列」という形でデータが入ってくるのでトークンの部分だけに加工
    // トークンの処理を済ませてからトークンがない場合の処理へ

    if(!token) {
      return res.status(400).json({message: "トークンがありません"})
    }

    // トークンがある場合・・・有効性の判定
    try{
      // jwt.verify は 引数で渡された JWT 文字列と鍵情報を用いて JWT の検証と読み取りを行う。
      const decoded = jwt.verify(token, secret_key)
      
      // トークンのメールアドレスとupdate/[id].jsとdelete/[id].jsに渡す(アイテムデータを登録したその人のみが修正と削除可能にするために使用)
      // (decoded as DecodedType)・・・decodedを型定義した書き方。asを使う=型アサーション
      req.body.email = (decoded as DecodedType).email
      return handler(req, res)
    }catch(err){
      // 不正なトークン、有効期限切れの場合
      return res.status(401).json({message: "トークンが正しくないので、ログインしてください"})
    }
  }
}

export default auth