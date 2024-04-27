// auth.js=ミドルウェア([id].jsのように特定のurlを持ったものでなく、urlを持ったファイルの機能を補助する。(これらのファイルが実行される前にトークンを確認し、ログイン状態を調べる))

import jwt from "jsonwebtoken"

const secret_key = "nextmarket"

// auth.jsはcreateItem,updateItem,deleteIttemを一度内部に受け取る(handler(任意))
const auth = (handler) => {
  return async(req, res) => {
    // リクエストの種類の判別
    // GETの場合はログイン判定不要なのでこれ以上処理を進めない
    // また、form.html等では<form>はGET,POSTしか使えないのでPOSTを設定し、Modelに格納された機能で実際の処理を行っている
    if(req.method === "GET") {
      return handler(req, res)
    }

    // const token = await req.headers.authorization.split("")[1]
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQG1vbmdvcm9yb3Jvcm9uLmNvbSIsImlhdCI6MTcxNDE0MDAzMiwiZXhwIjoxNzE0MjIyODMyfQ.gRzLsSw4ilQrbvKNSlMIDKapVo7Ai65lpJmDPy2dgJA"
    // トークンの処理を済ませてからトークンがない場合の処理へ

    if(!token) {
      return res.status(400).json({message: "トークンがありません"})
    }

    // トークンがある場合・・・有効性の判定
    try{
      // jwt.verify は 引数で渡された JWT 文字列と鍵情報を用いて JWT の検証と読み取りを行う。
      const decoded = jwt.verify(token, secret_key)
      
      // トークンのメールアドレスとupdate/[id].jsとdelete/[id].jsに渡す(アイテムデータを登録したその人のみが修正と削除可能にするために使用)
      req.body.email = decoded.email
      return handler(req, res)
    }catch(err){
      // 不正なトークン、有効期限切れの場合
      return res.status(401).json({message: "トークンが正しくないので、ログインしてください"})
    }
  }
}

export default auth