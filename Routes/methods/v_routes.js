function HomePage(req, res) {
    res.sendFile('index.html');

}

async function PostUrl(req, res) {
    try{
        let LinkData = await DBModel.create(req.body);
        res.json({
            success : true,
            short_url : req.protocol + '://' + req.hostname + ':' + process.env.port + '/' + LinkData.alias,
            alias : LinkData.alias,
            long_url : LinkData.longUrl
        })
    }catch(err){
        res.json({
            error : true,
            message : err.message
        })
    }
}

async function RedirectPage(req, res) {
    try{
        let LinkData = await DBModel.findOne({ alias : req.params.shortUrl});
        if(LinkData){
            await DBModel.findOneAndUpdate(
                {alias : req.params.shortUrl},
                {click : LinkData.click + 1})
            res.redirect(LinkData.url);
        }else{
            res.json({
                status : 404,
                message : "Page not found"
            })
        }
    }catch(err){
        res.json({
            error : true,
            message : err.message
        })
    }
}

module.exports = {
    HomePage,
    PostUrl,
    RedirectPage
}