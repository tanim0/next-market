const createItem = (req, res) => {
  console.log(req)
  return res.status(200).json({message: "アイテム作成"})
}

export default createItem

// フロントエンド(form.html)から投稿されたデータはreqのbodyに含まれてcreate.jsに渡されている
// (titleはinputのname属性と対応)