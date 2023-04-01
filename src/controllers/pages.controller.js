const GetAStart = require('../models/getstart.model')

exports.home = async (req, res, next) => {
    if(req.method == 'GET'){
        await GetAStart.findOne({}).then((data) => {
            let i_data = {}
                let i = 0;
                data.items.forEach(item => {
                    for(let key in item){
                    i_data[key+'_'+i] = item[key];
                    }
                    i++;
                });
                data = {
                    title: data.title,
                    description:data.description,
                    ...i_data,
                }
                console.log(data)
                res.render('index',data)
        })
    }
}

exports.about = (req, res) => {
    res.render('about');
}

exports.contact = (req, res) => {
    res.render('contact')
}

exports.blogDetails = (req, res) => {
    res.render('blog-details')
}

exports.portfolioDetails = (req, res) => {
    res.render('portfolio-details')
}

exports.errorPage = (req, res) => {
    res.render('404')
}