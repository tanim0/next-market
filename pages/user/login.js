// ログインページ・・・メールアドレスとパスワードを入力してバックエンドへと送り
// ログインが成功したか失敗したかを知らせるレスポンスを受け取る

import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { // Postリクエストで送るデータの種類やその他情報
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ // 送るデータはjson形式にしたい
          // inputに入力されたデータがそれぞれ保存される
          email: email,
          password: password
        })
      })

      // 成功時のアラートに/api/loginのresの中身を使用
      const jsonData = await response.json()
      // バックエンドで発行されたtokenをフロントで受け取りLocalStrageで保管する
      // localstrageのデータ保管・・・setItem()、取得・・・getItem()
      // localstrage.setItem("補完するデータの名前", 保管するデータ)
      localStorage.setItem("token", jsonData.token)
      alert(jsonData.message)

    }catch(err){
      console.log("ログインに失敗しました")
    }
  }

  return (
    <div>
      <h1>ログイン</h1>
      <form onSubmit={handleSubmit}>  
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス"/>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder="パスワード"/>
        <button>ログイン</button>
      </form>
    </div>
  )
}

export default Login