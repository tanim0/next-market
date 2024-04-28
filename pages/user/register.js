import { useState } from "react"

const Register = () => {

  // ★stateを複数の項目をまとめた書き方にする
  // const [name, setName] = useState("")
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // ↓
  // stateを1つにまとめて管理、操作
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  })
  // ↓
  // stateにデータを書き込むsetName()やsetPassword()も一つにまとめる(<input>も併せて修正)
  const handleChange = (e) => {
    setNewUser({
      ...newUser, // スプレッド構文（それぞれの項目に新しいデータを書き込む）
      [e.target.name]: e.target.value // e.target.name=それぞれ入力されてるstate内の項目名(name,email,password)に対して入力してる内容をvalueとして設定
    })
  }
  
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
        body: JSON.stringify(newUser)
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
        <input value={newUser.name} onChange={handleChange} type="text" name="name" placeholder="名前" required/>
        <input value={newUser.email} onChange={handleChange} type="text" name="email" placeholder="メールアドレス" required/>
        <input value={newUser.password} onChange={handleChange}type="text" name="password" placeholder="パスワード" required/>
        <button>登録</button>
      </form>
    </div>
  )
}

export default Register