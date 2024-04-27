import { useState } from "react"

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handleSubmit = async(e) => {
    e.preventDefault() // <form>で<button>を押して送信処理をするとリロードされてしまう設計を止める
    try{
      // ユーザーのデータ作成はapi/user/register.jsで行われてる
      // バックエンドから返されたres.status...がconst responseの中へ格納される
      const response = await fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: { // リクエストで送るデータの種類やその他捕捉情報を追加
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({  //Json.stringify()・・・json形式に変換
          name: name,
          email: email,
          password: password
        })
      })
      const jsonData = await response.json() //レスポンスデータはストリームという特殊な形式なのでjsonに変換
      alert(jsonData.message) // api.registerで設定したresの中にあるmessageをアラート表示
    }catch(err){
      alert("ユーザー登録に失敗しました")
    }
  }

  return (
    <div>
      <h1>ユーザー登録</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="名前" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="email" placeholder="メールアドレス" />
        <input value={password} onChange={(e) => setPassword(e.target.value)}type="text" name="password" placeholder="パスワード" />
        <button>登録</button>
      </form>
    </div>
  )
}

export default Register