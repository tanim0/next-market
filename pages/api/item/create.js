import connectDB from "../../utils/database"

const createItem = (req, res) => {
  connectDB()
  console.log(req.body.title)
  return res.status(200).json({message: "アイテム作成"})
}

export default createItem

// フロントエンド(form.html)から投稿されたデータはreqのbodyに含まれてcreate.jsに渡されている
// (titleはinputのname属性と対応)