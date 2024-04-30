// 1つの商品情報を表示するページ(フロント側のread.jsに当たるファイル)

import type { NextPage, GetServerSideProps } from "next"
import { ReadSingleDataType } from "../../utils/types"
import Image from "next/image"
import Link from "next/link"
import Head from "next/head"

// propsに含まれるsingleItemの型定義が必要(types.ts)
const ReadSingleItem: NextPage<ReadSingleDataType> = (props) => {
  return (
    <div className="grid-container-si">
      <Head><title>{props.singleItem.title}</title></Head>
      <div>
        <Image src={props.singleItem.image} width="750" height="500" alt="商品画像" />
      </div>
      <div>
        <h1>{props.singleItem.title}</h1>
        <h2>¥{props.singleItem.price}</h2>
        <hr />
        <p>{props.singleItem.description}</p>

        <div>
          <Link href={`/item/update/${props.singleItem._id}`}>編集</Link>
          <Link href={`/item/delete/${props.singleItem._id}`}>削除</Link>
        </div>
        
      </div>
    </div>
  )
}

export default ReadSingleItem

// urlのデータはcontextのqueryのidに入っている
// getServerSideProps専用の型定義ReadSingleDataTypeとprop部分にReadSingleDataTypeを適用
export const getServerSideProps: GetServerSideProps<ReadSingleDataType> = async(context) => {
  const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`)
  const singleItem = await response.json()

  // データはreturnにセットすることでconst getServerSideProps = () => {...}にpropsとして渡される
  return {
    props: singleItem
  }
}