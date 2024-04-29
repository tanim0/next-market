import { useState } from "react"
import useAuth from "../../utils/useAuth"

const CreateItem = () => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault() //formをbuttonで実行した際のブラウザのリロードを止める
    try{
      // データ送付が完了した時にバックエンドから返されるレスポンスと確認できるようresponseに格納し返されたデータをjson形式に変更
      const response = await fetch("http://localhost:3000/api/item/create", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          // 商品登録はログインが有効なユーザーのみ行えるのでトークンのデータをheadersに含めて送信
          "authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: title,
          price: price,
          image: image,
          description: description
        })
      })
      // バックエンドで設定したレスポンス内のmessageをalertで表示
      const jsonData = await response.json()
      alert(jsonData.message)
    }catch(err){
      alert("アイテム作成に失敗しました")
    }
  }

  const loginUser = useAuth() // 返り値メールアドレス

  // ログインしていたら(トークンも有効だったら)アイテム作成ページを表示
  if(loginUser) {
    return (
      <div>
        <h1>アイテム作成</h1>
        <form onSubmit={handleSubmit} method="POST">
          タイトル：<input value={title} onChange={(e) => setTitle(e.target.value)}type="text" name="title" placeholder="アイテム名" required/>
          価格：<input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required />
          イメージ：<input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required />
          説明：<textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" placeholder="商品説明" required></textarea>
          <button type="submit">作成</button>
        </form>
      </div>
    )
  }
}

export default CreateItem