// ログイン状態や誰がログインしているのかを判定
// 特定の機能を持ったReactコード=カスタムフック

import { useRouter } from "next/router"
import jwt from "jsonwebtoken"
import { useEffect, useState } from "react"
import { DecodedType } from "./types"

const secret_key = "nextmarket"

const userAuth = () => {
  const [loginUser, setLoginUser] = useState("")

  const router = useRouter()

  // useEffect・・・ページが表示されるまでに行いたい処理に使用(修正、削除ページの読み込みが早く一瞬表示されることを防ぐ)
  useEffect(() => {
    // ユーザーがログインしているか調べる・・・LocalStorageにトークンがあるかを確認
    const token = localStorage.getItem("token")

    if(!token) { // トークンがない場合はログインページへ飛ばす
      router.push("/user/login")
    }
    
    // トークンがある場合はトークンが有効であるかを調べる(jwt.veryfy())
    // jwt.verify は 引数で渡された JWT 文字列と鍵情報を用いて JWT の検証と読み取りを行う
    try{
      const decoded = jwt.verify(token!, secret_key) // !でtokenがnullになる可能性があるために出るエラーを回避(トークンは必ず存在することを示す)。!以外にもtokenが必ずstringである(token as string)とすることでも対応できる
      // 解析したトークンの中にあるログインユーザーのメールアドレスとloginUserの中に書き込む
      setLoginUser((decoded as DecodedType).email)
    }catch(error){
      router.push("/user/login")
    }

  }, [router])

  return loginUser // このファイルが処理した結果(=ログインユーザーのメールアドレスが格納されたloginUser)を他のファイルで使えるようにする)

}

export default userAuth