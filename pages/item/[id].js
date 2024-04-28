// 1つの商品情報を表示するページ(フロント側のread.jsに当たるファイル)

import Image from "next/image"

const ReadSingleItem = (props) => {
  return (
    <div>
      <div>
        <Image src={props.singleItem.image} width="750" height="500" />
      </div>
      <div>
        <h1>{props.singleItem.title}</h1>
        <h2>¥{props.singleItem.price}</h2>
        <hr />
        <p>{props.singleItem.description}</p>
      </div>
    </div>
  )
}

export default ReadSingleItem

// urlのデータはcontextのqueryのidに入っている
export const getServerSideProps = async(context) => {
  const response = await fetch(`http://localhost:3000/api/item/${context.query.id}`)
  const singleItem = await response.json()

  // データはreturnにセットすることでconst getServerSideProps = () => {...}にpropsとして渡される
  return {
    props: singleItem
  }
}