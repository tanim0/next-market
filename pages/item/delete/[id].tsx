// 商品削除ページ・・・アイテムデータを一つ読み取り、投稿の処理
// 削除＝>バックエンドで/api/item/delete/[id].jsで処理が始まる
// データを投稿しないPOSTリクエスト

// 商品修正ページからデータのstateの保持や入力データの送信を省いたものに近い

import { NextPage, GetServerSideProps } from "next"
import { ReadSingleDataType } from "../../../utils/types"
import Image from "next/image"
import useAuth from "../../../utils/useAuth"
import Head from "next/head"

const DeleteItem: NextPage<ReadSingleDataType> = (props) => {

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() //formをbuttonで実行した際のブラウザのリロードを止める
    try{
      // データ送付が完了した時にバックエンドから返されるレスポンスと確認できるようresponseに格納し返されたデータをjson形式に変更
      const response = await fetch(`http://localhost:3000/api/item/delete/${props.singleItem._id}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          // 商品登録はログインが有効なユーザーのみ行えるのでトークンのデータをheadersに含めて送信
          "authorization": `Bearer ${localStorage.getItem("token")}`
        }
        // deleteは送るべきデータは何もないのでbodyは不要
      })
      // バックエンドで設定したレスポンス内のmessageをalertで表示
      const jsonData = await response.json()
      alert(jsonData.message)
    }catch(err){
      alert("アイテム削除に失敗しました")
    }
  }

  const loginUser = useAuth()

  if(loginUser === props.singleItem.email) {
    return (
      <div className="delete-page">
        <Head><title>アイテム削除</title></Head>
        <h1 className="page-title">アイテム削除</h1>
        <form onSubmit={handleSubmit} method="POST">
          <h2>{props.singleItem.title}</h2>
          <Image src={props.singleItem.image} width="750" height="500" alt="商品画像" />
          <h3>¥{props.singleItem.price}</h3>
          <p>{props.singleItem.description}</p>
          <button type="submit">削除</button>
        </form>
      </div>
    )
  }
}

export default DeleteItem

// バックエンドからデータ取得(1つだけアイテムデータを読み取りデータをpropsへ渡す)
// urlのデータはcontextのqueryのidに入っている
export const getServerSideProps: GetServerSideProps<ReadSingleDataType> = async(context) => {
  const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`)
  const singleItem = await response.json()

  // データはreturnにセットすることでconst getServerSideProps = () => {...}にpropsとして渡される
  return {
    props: singleItem
  }
}