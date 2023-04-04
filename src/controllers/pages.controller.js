const GetAStart = require('../models/getstart.model')
const Blog = require('../models/blog.model')
const Professional = require('../models/professionals.model')
const File = require('../models/file.model')


exports.home = async (req, res, next) => {
    if(req.method == 'GET'){
        let getstart = await GetAStart.findOne({});
        let i_data = {}
        let i = 0;
        getstart.items.forEach(item => {
            for(let key in item){
            i_data[key+'_'+i] = item[key];
            }
            i++;
        });
        getastart = {
            title: getstart.title,
            description:getstart.description,
            ...i_data,
        }

        let blg = await Blog.find({});
        let blogArr = [];
        for (const blog of blg) {
            let temp = {};
            let f = await File.findOne({_id : blog.file});
            temp._id = blog._id;
            temp.title = blog.title;
            temp.description = blog.description;
            temp.tagline = blog.tagline;
            temp.filepath = f.path;
            blogArr.push(temp);
        }

        let proff = await Professional.find({});
        let proffArr = [];
        for (const pr of proff) {
            let temp = {};
            let f = await File.findOne({_id : pr.file});
            temp.id = pr._id;
            temp.title = pr.title;
            temp.description = pr.description;
            temp.position = pr.position;
            temp.tagline = pr.tagline;
            temp.filepath = f.path;
            proffArr.push(temp);
        }
        let data = {
            getastart: getastart,
            blog: blogArr,
            professional: proffArr
        }
        // console.log(data.professional);

        res.render('index',{data})
        
    }
}

exports.about = async (req, res) => {
    if(req.method == 'GET'){
        await Professional.findOne({_id: req.query.id}).then((result) => {
            let data = {
                id: result._id,
                title: result.title,
                description: result.description,
                position: result.position
            }
            res.render('about', {data})
        })
       return res.render('about')
    }
    res.render('about')
}

exports.contact = (req, res) => {
    res.render('contact')
}

exports.blogDetails = async (req, res) => {
    if(req.method == 'GET'){
        await Blog.findOne({_id: req.query.id}).then((result) => {
            let data = {
                id: result._id,
                title: result.title,
                description: result.description,
            }
            res.render('blog-details', {data})
        })
       return res.render('blog-details')
    }
    res.render('blog-details')
}

exports.portfolioDetails = async (req, res) => {
    if(req.method == 'GET'){
        await Professional.findOne({}).then((data) => {
                // let i_data = {}
                // let i = 0;
                // data.items.forEach(item => {
                //     for(let key in item){
                //     i_data[key+'_'+i] = item[key];
                //     }
                //     i++;
                // });
                data = {
                    title: data.title,
                    description:data.description,
                    
                }
                console.log(data)
                res.render('portfolio-details',data)
        })
    }
}

exports.errorPage = (req, res) => {
    res.render('404')
}