async function CheckParam(req, res, next) {
    try{
        let data = await DBModel.findOne({
            alias : req.params.shorturl,
        })
        if(data){
            next();
        }else{
            res.json({
                status : 404,
                message : 'Page not found'
            })
        }
    }catch(err){
        res.json({
            error : true,
            message : err.message
        }
        )
    }
}

async function RedirectPage(req, res) {
    try{
        let data = await DBModel.findOne({
            alias : req.params.shorturl
        })
        data = await DBModel.findOneAndUpdate(
            {alias : data.alias},
            {clicks : data.clicks + 1}
            )
        res.redirect(data.longUrl);
    }catch(err){
        res.json({
            error : true,
            message : err.message
        }
        )
    }
}

async function DeletePage(req, res) {
    try{
        await DBModel.deleteOne({
            alias : req.params.shorturl
        })
        res.json({
            status: "deleted",
            message: "Short URL deleted successfully"
        })
    }catch(err){
            res.json({
                error : true,
                message : err.message
            }
            )
        }
}


async function GetStats(req, res){
    let data = await DBModel.findOne(
        {
            alias : req.params.shorturl
        }
    )
    res.json({
        success : true,
        long_url : data.longUrl,
        short_url : req.protocol + '://' + req.hostname + ":" + process.env.port +  '/' + data.alias ,
        alias : data.alias,
        clicks : data.clicks,
        created_at : data.createdAt
    })
}

module.exports = {
    CheckParam,
    RedirectPage,
    DeletePage,
    GetStats
}