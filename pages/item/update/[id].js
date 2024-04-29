// 商品編集ページ・・・1つだけアイテムデータを読み取り＋アイテムデータを作成

import { useState } from "react"
import useAuth from "../../../utils/useAuth"
import Head from "next/head"

const UpdateItem = (props) => {
  // 初期データは取得したデータが表示されるよう
  const [title, setTitle] = useState(props.singleItem.title)
  const [price, setPrice] = useState(props.singleItem.price)
  const [image, setImage] = useState(props.singleItem.image)
  const [description, setDescription] = useState(props.singleItem.description)

  const handleSubmit = async(e) => {
    e.preventDefault() //formをbuttonで実行した際のブラウザのリロードを止める
    try{
      // データ送付が完了した時にバックエンドから返されるレスポンスと確認できるようresponseに格納し返されたデータをjson形式に変更
      const response = await fetch(`https://next-market-sage.vercel.app/api/item/update/${props.singleItem._id}`, {
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
      alert("アイテム編集に失敗しました")
    }
  }

  const loginUser = useAuth() // 返り値メールアドレス
  console.log(loginUser)

  // そのアイテムを作成したユーザーにのみ編集画面を表示
  if(loginUser === props.singleItem.email) {
    return (
      <div>
        <Head><title>アイテム編集</title></Head>
        <h1 className="page-title">アイテム編集</h1>
        <form onSubmit={handleSubmit} method="POST">
          タイトル：<input value={title} onChange={(e) => setTitle(e.target.value)}type="text" name="title" placeholder="アイテム名" required/>
          価格：<input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="price" placeholder="価格" required />
          イメージ：<input value={image} onChange={(e) => setImage(e.target.value)} type="text" name="image" placeholder="画像" required />
          説明：<textarea value={description} onChange={(e) => setDescription(e.target.value)} type="text" name="description" placeholder="商品説明" required></textarea>
          <button type="submit">編集</button>
        </form>
      </div>
    )
  }
}

export default UpdateItem

// バックエンドからデータ取得(1つだけアイテムデータを読み取りデータをpropsへ渡す)
// urlのデータはcontextのqueryのidに入っている
export const getServerSideProps = async(context) => {
  const response = await fetch(`https://next-market-sage.vercel.app/api/item/${context.query.id}`)
  const singleItem = await response.json()

  // データはreturnにセットすることでconst getServerSideProps = () => {...}にpropsとして渡される
  return {
    props: singleItem
  }
}