import Link from "next/link"
import Image from "next/image"
import Head from "next/head"

const ReadAllItems = (props) => {
  return(
    <div>
      <Head><title>Next Market</title></Head>
      <div className="grid-container-in">
        {props.allItems.map(item =>
          <Link className="card" href={`/item/${item._id}`} key={item._id}>
            <Image src={item.image} className="item-img-list" width={750} height={500} alt="item-image"/>
            <div className="texts-area">
              <h2>¥{item.price}</h2>
              <h3>{item.title}</h3>
              <p>{item.description.substring(0, 80)}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ReadAllItems

// getServerSideProps・・・Neext.jsが用意しているでデータ取得のための特別な機能
export const getServerSideProps = async() => {
  const response = await fetch("http://localhost:3000/api/item/readall")
  const allItems = await response.json()

  return {
    props: allItems
  }
}