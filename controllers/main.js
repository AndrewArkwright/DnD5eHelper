module.exports = {
    getIndex: (req, res) => {
        if (req.user) {
          return res.redirect('/character')
        }
        res.render('index.ejs', {
        })
    }
}