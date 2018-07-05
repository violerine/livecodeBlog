const Article = require ("../models/article")
const User = require("../models/user")
const images = require ('../helper/gcp')
const Storage = require('@google-cloud/storage');
const storage = new Storage();

module.exports={ 
    getAllArticle:(req,res,next)=>{
        Article.find({})
        .sort({createdAt:'desc'})
        .populate('userId')
        .then(articles=>{
            res.status(200).json(articles)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },

    getArticleByUserId:(req,res,next)=>{
        Article.find({userId:req.params.userid})
        .then(articles=>{
            res.status(200).json(articles)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },

    getArticleByCategory:(req,res,next)=>{
        Article.find({category:req.params.category})
        .then(articles=>{
            res.status(200).json(articles)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },

    getArticleByAuthor:(req,res,next)=>{
        Article.find({author:req.params.author})
        .then(articles=>{
            res.status(200).json(articles)
        })
        .catch(err=>{
            res.status(400).json(err)
        })
    },

    addNewArticle:(req,res,next)=>{
        let articleData = {
            userId:req.body.userid,
            title : req.body.title,
            author:req.body.author,
            category:req.body.category,
            content : req.body.content,
            pic_url:req.file.cloudStoragePublicUrl,
        }

        let newArticle = new Article(articleData)
        console.log(newArticle)
        newArticle.save()
        .then(article=>{
            res.status(200).send(article)
        })
        .catch(err=>{
            res.status(400).send(err)
        })

    },

    // updateArticle:(req,res,next)=>{
    //     let body={
    //         userId:req.body.userid,
    //         title : req.body.title,
    //         author:req.body.author,
    //         category:req.body.category,
    //         content : req.body.content,
    //         pic_url:req.file.cloudStoragePublicUrl,
    //     }
    //     Article.findByIdAndUpdate(req.params.id)
    // },

    deleteArticle:(req,res,next)=>{
        Article.findByIdAndRemove(req.params.id)
        .then(article=>{
            var splitArticle=article.pic_url.split('/')
            console.log(splitArticle)
            var filename=splitArticle[splitArticle.length-1]
            res.send("deleted")
            function deleteImage(){
                storage
                .bucket('livecodeblog')
                .file(filename)
                .delete()
                .then(() => {
                    console.log(`gs://livecodeblog/${filename} deleted.`);
                })
                .catch(err => {
                    console.error('ERROR:', err);
                });
            }
            deleteImage()
            
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    }
}
