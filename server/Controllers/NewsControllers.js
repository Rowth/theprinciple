const News = require("../models/NewsModel");
const path = require('path');
const ads = require("../models/advertisement");
const Category = require("../models/CategoryModel");
const subCategory = require("../models/subCategoryModel");
const subSubCat = require("../models/subSubCategory");
const Complaint = require("../models/complaintModel")
const DIR = path.join(__dirname, '../../client/src/assets/uploads');
const multer = require("multer");
let { S3 } = require("aws-sdk");
const fs = require("fs");
const multerS3 = require("multer-s3");
const webWork = require("../models/logoModel");
const dotenv = require("dotenv").config();
const { replyEmail } = require('../NodeMailer/nodeMailer')
// const storage = multer.diskStorage({});
const s3Bucket = new S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.ACCESS_SECRET,
    region: process.env.REGION,
});
// console.log(process.env.ACCESS_KEY,process.env.ACCESS_SECRET,process.env.REGION)

const uploadS3 = async (req) => {
    try {
        let file = req;
        let randomNO = Math.floor(Math.random() * 1000);
        let fileKey = null;
        fileKey = `${randomNO}/${file.originalname}`;
        let buffer = fs.readFileSync(file.path);
        const params = {
            Bucket: process.env.BUCKET,
            ContentType: file.mimetype,
            Key: fileKey,
            Body: buffer,
        };
        console.log(params, "params")
        return new Promise((resolve, reject) => {
            s3Bucket.upload(params, (err, data) => {
                if (err) {
                    reject(err.message);
                }
                console.log(data, "data");
                return resolve(data.Location);
            });
        });
    } catch (error) {
        console.log(error, "error");
    }
};
var storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, DIR)
    // },
    // filename: function (req, file, cb) { if (file.originalname) { cb(null, file?.originalname) } }

})

var upload = multer({ storage: storage });
// const upload = multer({ storage: storage });
// #####News API####
const addNews = async (news) => {
    try {
        if (news.subCategoryId == '' || news.subCategoryName == '') {
            delete news.subCategoryId;
            delete news.subCategoryName;
        }
        if (news.subSubCateId == '' || news.subSubCateName == '') {
            delete news.subSubCateId;
            delete news.subSubCateName;
        }
        const neews1 = await new News(news).save();
        const findCatCount = await Category.findByIdAndUpdate(news.categoryId);
        const updateCount = await Category.findByIdAndUpdate(news.categoryId, {
            count: findCatCount.count + 1,
        });
        const findSubCount = await subCategory.findByIdAndUpdate(
            news.subCategoryId
        );
        const updateSubCount = await subCategory.findByIdAndUpdate(
            news.subCategoryId, { count: findSubCount.count + 1 }
        );
        const findSubTwoCount = await subSubCat.findByIdAndUpdate(
            news.subSubCateId
        );
        const updateSubTwoCount = await subSubCat.findByIdAndUpdate(
            news.subSubCateId, { count: findSubTwoCount.count + 1 }
        );
        return neews1;
    } catch (error) {
        return error;
    }
};
const getOneNews = async (req, res) => {
    try {
        console.log(req.query, "---")
        let id = req.query.id;
        let news;
        news = await News.findById(id);
        if (!news) {
            res.status(401).json({ status: 401, message: "News not exist" });
        } else {
            res.json(news);
        }
    } catch (error) {
        return res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};
const getNewsCate = async (req, res) => {
    try {
        console.log(req.query, "---")
        const limitData = req.query.limit;
        const pageData = req.query.page;
        id = req.query.id;
        const news = await News.find({ categoryId: id, newsType: "textnews" }).limit(limitData).skip(pageData * limitData).sort({ createdAt: -1 });
        console.log(news, "--news")
        const adsData = await ads.find({ adsCategoryId: id, filetype: "image/jpeg" }).sort({ viewOrder: 1 });
        const countCatNews = await News.find({ categoryId: id, newsType: "textnews" }).count();
        if (news.length == 0) {
            res.status(401).json({ status: 401, message: "News not exist" });
        } else {
            return res.status(200).json({ status: 200, response: news, countCatNews, adsData });
        }
    } catch (error) {
        return res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};
const getNews = async (req, res) => {
    try {
        const sizeLimit = req.params.limit;
        const page = req.params.page;
        const cates = await News.aggregate([
            {
                $match: {
                    newsType: "textnews"
                }
            }, {
                $group: {
                    _id: "$categoryId",
                    firstSale: { $first: "$$ROOT" },
                },
            },
            { $replaceRoot: { newRoot: "$firstSale" } },
        ]);
        let newsArray = [];
        const news1 = await News.find({ newsType: "textnews" }).populate("categoryId").populate("subSubCateId").populate("subCategoryId").sort({ createdAt: -1 }).limit(sizeLimit).skip(page * sizeLimit);
        for (let i = 0; i < cates.length; i++) {
            const news = await News.find({ categroyName: cates[i].categroyName, newsType: "textnews", youTubeLink: { $exists: false } }).limit(6).sort({ createdAt: -1 });
            const totalNews = await News.find({ newsType: "textnews" }).count();
            newsArray.push(news);
            if (i == cates.length - 1) {
                res.status(201).json({ totalNews, cates, newsArray, news1 });
            }
        }

    } catch (error) {
        return res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};

const getVideosNews = async (req, res) => {
    try {
        const sizeLimit = req.params.limit;
        const page = req.params.page;
        // const cates = await News.aggregate([{
        //     $group: {
        //         _id: "$categoryId",
        //         firstSale: { $first: "$$ROOT" },
        //     },
        // },
        // { $replaceRoot: { newRoot: "$firstSale" } },
        // ]);
        // let newsArray = [];
        const videoNews = await News.find({ newsType: "video" }).populate("categoryId").populate("subSubCateId").populate("subCategoryId").sort({ createdAt: -1 }).limit(sizeLimit).skip(page * sizeLimit);
        const videosTotalNews = await News.find({ newsType: "video" }).count();
        if (videoNews.length == 0) {
            res.status(200).send("video Data not exits");
        }
        else {
            res.status(200).json({ videoNews, videosTotalNews })
        }
        // videoNews.length==0? res.status(200).send("video Data not exits"): res.status(201).json({ videoNews, videosTotalNews })
        // console.log(,videosTotalNews,"---");
        // for (let i = 0; i < cates.length; i++) {
        //     const news = await News.find({ categroyName: cates[i].categroyName })
        //         .limit(6)
        //         .sort({ createdAt: -1 });
        //     const totalNews = await News.find().count();
        //     newsArray.push(news);
        //     if (i == cates.length - 1) {
        //         res.status(201).json({ totalNews, cates, newsArray, news1 });
        //     }
        // }

    } catch (error) {
        return res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};
const getPdfNews = async (req, res) => {
    try {
        const sizeLimit = req.params.limit;
        const page = req.params.page;
        // const videoNews = await News.find({ newsType: "video" }).populate("categoryId").populate("subSubCateId").populate("subCategoryId").sort({ createdAt: -1 }).limit(sizeLimit).skip(page * sizeLimit);
        const pdfNews = await News.find({ newsType: "pdfNews" }).populate("categoryId").sort({ createdAt: -1 }).limit(sizeLimit).skip(page * sizeLimit);
        const pdfTotalNews = await News.find({ newsType: "pdfNews" }).count();
        if (pdfNews.length == 0) {
            res.status(200).send("pdf News Data Not Exits");
        }
        res.status(200).json({ pdfNews, pdfTotalNews })

    } catch (error) {
        console.log(error, "--");
        return res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};

const updateNews = async (idd, news) => {
    try {
        const id = idd;
        const options = { new: true };
        if (news.subCategoryId == "") {
            let x = await News.updateOne({ _id: id }, { $unset: { subCategoryId: 1, subCategoryName: 1 } });
            delete news.subCategoryId;
            delete news.subCategoryName;
        }
        if (news.subSubCateId == "") {
            let x = await News.updateOne({ _id: id }, { $unset: { subSubCateId: 1, subSubCateName: 1 } });
            delete news.subSubCateId;
            delete news.subSubCateName;
        }
        const update = await News.findByIdAndUpdate(id, news, options);
        return update;
    } catch (error) {
        console.log(error)
        return error;
    }
};

const deleteNews = async (req, res) => {
    try {
        const id = req.params.id;
        // const findCat = await News.findById({ _id: id });
        const deleteNews = await News.findByIdAndDelete({ _id: id });
        // const findCatCount = await Category.findByIdAndUpdate(findCat.categoryId);
        // const updateCount = await Category.findByIdAndUpdate(findCatCount._id, {
        //     count: findCatCount.count - 1,
        // });
        // const findSubCount = await subCategory.findByIdAndUpdate(
        //     findCat.subCategoryId
        // );
        // const updateSubCount = await subCategory.findByIdAndUpdate(
        //     findSubCount._id, { count: findSubCount.count - 1 }
        // );
        // const findSubTwoCount = await subSubCat.findByIdAndUpdate(
        //     findCat.subSubCateId
        // );
        // const updateSubTwoCount = await subSubCat.findByIdAndUpdate(
        //     findCat.subSubCateId, { count: findSubTwoCount.count - 1 }
        // );
        if (!deleteNews) {
            return res.status(401).json({ status: 401, message: "News not exist" });
        } else {
            return res.status(200).json({
                status: 200,
                message: "Successfully delete News",
                response: deleteNews,
            });
        }
    } catch (error) {
        res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};
const getCateNews = async (req, res) => {
    try {
        const limitValue = req.query.limit;
        const pageValue = req.query.page;
        const objData = {};
        objData.newsType = "textnews";
        switch (req.query.name) {
            case 'Category':
                objData.categroyName = { $regex: '^' + req.query.id, $options: 'i' };
                objData.subCategoryName = { $exists: false }
                objData.subSubCateName = { $exists: false }
                break;
            case 'SubCategory':
                objData.subCategoryName = { $regex: req.query.id, $options: 'i' };
                objData.subSubCateName = { $exists: false }
                break;
            case 'SubSubCategory':
                objData.subSubCateName = { $regex: req.query.id, $options: 'i' };
                break;
        }
        const findAds = await ads.find().sort({ viewOrder: 1 })
        const findCatNews = await News.find(objData).sort({ createdAt: -1 }).limit(limitValue).skip(limitValue * pageValue);
        const countNews = await News.find(objData).count();
        if (findCatNews.length == 0) {
            return res.status(200).json({ status: 200, message: `${req.query.name} News not exist` })
        }
        else {
            return res.status(200).json({ status: 200, response: findCatNews, countNews });
        }
    } catch (error) {

        return res.status(503).json({ status: 503, message: "Invalid Data" });
    }
}

// #####advertisement Api###
const addAds = async (adsField) => {
    try {
        const adds = await new ads(adsField).save();
        return adds;
    } catch (error) {
        return error;
    }
};
const updateAds = async (Id, adsField) => {
    try {
        const id = Id;
        const options = { new: true };
        const update = await ads.findByIdAndUpdate(id, adsField, options);
        return update;
    } catch (error) {
        return error;
    }
};

const getAds = async (req, res) => {
    try {
        let objData = {};
        switch (req.query.name) {
            case "Category":
                objData.adsCategoryName = { $regex: req.query.id, $options: "i" };
                break;
            case "SubCategory":
                objData.adsSubcateName = { $regex: req.query.id, $options: "i" };
                break;
            case "SubSubCategory":
                objData.adsSubSubCateName = { $regex: req.query.id, $options: "i" };
                break;
        }
        const findAds = await ads
            .find(objData)
            .sort({ viewOrder: 1, createdAt: -1 });
        const adsData = await ads
            .aggregate([
                { $match: objData },
                {
                    $group: {
                        _id: "$viewOrder",
                        firstSale: { $first: "$$ROOT" },
                    },
                },
                { $replaceRoot: { newRoot: "$firstSale" } },
            ])
            .sort({ viewOrder: 1, createdAt: -1 });
        let imgAds = [];
        for (let i = 0; i < adsData.length; i++) {
            objData.viewOrder = adsData[i].viewOrder;
            const adsArray = await ads.find(objData);
            const countAds = await ads.find().count();
            imgAds.push(adsArray);
            if (i == adsData.length - 1) {
                res.send({ findAds, countAds, imgAds });
            }
        }
    } catch (error) {
        console.log("message error: " + error.message)
        return res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};
const getOneAds = async (req, res) => {
    try {
        const id = req.query.id;
        const findAds = await ads.findById(id);
        if (!findAds) {
            return res
                .send(401)
                .json({ status: 404, message: "advertisement not available" });
        } else {
            res.send(findAds);
        }
    } catch (error) {
        return res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};
// const findCatAds = async (req, res) => {
//     try {
//         const id = req.query.id;
//         const findAds = await ads.findById(id);
//         if (!findAds) {
//             return res.send(401).json({ status: 404, message: 'advertisement not available' })
//         }
//         else {
//             res.send(findAds);
//         }
//     }
//     catch (error) {
//         return res.status(503).json({ status: 503, message: 'Invalid Data' });
//     }
// }

const deleteAds = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteAds = await ads.findByIdAndDelete(id);
        if (!deleteNews) {
            return res.status(401).json({ status: 401, message: "Ads not exist" });
        } else {
            return res.status(200).json({ status: 200, message: "Successfully delete Ads", response: deleteAds, });
        }
    } catch (error) {
        res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};

// ###webSetting Api###
const addLogoLink = async (news) => {
    try {
        const saveData = await new webWork(news).save();
        return saveData;
    } catch (error) {
        return error;
    }
};
const updataLogoLink = async (Id, news) => {
    try {
        const id = Id;
        const options = { new: true };
        const update = await webWork.findByIdAndUpdate(id, news, options);
        return update;
    } catch (error) {
        return error;
    }
};
const getSettingData = async (req, res) => {
    try {
        const findData = await webWork.findOne().sort({ createdAt: -1 });
        if (findData.length == 0) {
            return res
                .send(401)
                .json({ status: 404, message: "advertisement not available" });
        } else {
            res.send({ status: 200, findData });
        }
    } catch (error) {
        return res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};

// ####Search Api ####
const searchApi = async (req, res) => {
    try {
        const keySearch = req.body.search;
        const findData = await News.find({
            $or: [
                { categroyName: { $regex: keySearch, $options: "i" } },
                { subCategoryName: { $regex: keySearch, $options: "i" } },
                { subSubCateName: { $regex: keySearch, $options: "i" } },
                { news: { $regex: keySearch, $options: "i" } },
                { title: { $regex: keySearch, $options: "i" } },
                { imagename: { $regex: keySearch, $options: "i" } },
                { natureNews: { $regex: keySearch, $options: "i" } },
                { Subtitle: { $regex: keySearch, $options: "i" } },
                { engTitle: { $regex: keySearch, $options: "i" } },
                { imageTitle: { $regex: keySearch, $options: "i" } },
            ],
        });
        const adsCouts = await News.find({
            $or: [
                { categroyName: { $regex: keySearch, $options: "i" } },
                { subCategoryName: { $regex: keySearch, $options: "i" } },
                { subSubCateName: { $regex: keySearch, $options: "i" } },
                { news: { $regex: keySearch, $options: "i" } },
                { title: { $regex: keySearch, $options: "i" } },
                { imagename: { $regex: keySearch, $options: "i" } },
                { natureNews: { $regex: keySearch, $options: "i" } },
                { Subtitle: { $regex: keySearch, $options: "i" } },
                { engTitle: { $regex: keySearch, $options: "i" } },
                { imageTitle: { $regex: keySearch, $options: "i" } },
            ],
        }).count();
        console.log("adsCouts", adsCouts);
        res.status(200).json({ status: 200, findData, adsCouts });
    } catch (error) {
        res.status(503).json({ status: 503, message: "Invalid Data" });
    }
};

//Complaint Api
const addComplaint = async (req, res) => {
    try {
        console.log(req.body, "---body here---")
        const complaint = new Complaint(req.body);
        console.log(complaint, "complaint");
        if (!complaint) {
            res.status(401).json({ status: 401, message: 'Invalid data' })
        }
        else {
            const newComplaint = await Complaint(complaint).save()
            return res.status(200).json({ status: 200, message: ' Your Complaint Was Successfully Submit ' })
        }

    }
    catch (error) {
        res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}
const getComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.find({ channelName: { $exists: true } }).sort({ createdAt: -1 })
        if (!complaint) {
            return res.status(401).json({ status: 401, message: 'Complaint not exist' })
        }
        return res.send(complaint)
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}
const getComplaintId = async (req, res) => {
    try {
        console.log(req.query, "---")
        const id = req.query.id
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(401).json({ status: 401, message: 'Complaint not exist' })
        }
        return res.send(complaint)
    } catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}
const ComplaintMail = async (req, res) => {
    try {
        const complaintData = await Complaint.findOne({ email: req.body.email })
        if (!complaintData) {
            return res.status(401).json({ status: 401, message: "invalid complaint" });
        }
        else {
            const body = req.body.complText;
            const title = complaintData.channelName;
            const date = complaintData.complaintDate;
            const options = { new: true };
            const rplySave = await Complaint.findByIdAndUpdate(complaintData._id, { rplyBody: body }, options);
            if (body) {
                replyEmail(body, req.body.email, title, date)
            }
            return res.status(200).json({ status: 200, message: "reply successfully sent" });
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: "Invalid Data" });
    }
}
module.exports = {
    addNews,
    getNews,
    getOneNews,
    updateNews,
    deleteNews,
    searchApi,
    getNewsCate,
    getCateNews,
    uploadS3,
    upload,
    addAds,
    updateAds,
    getAds,
    getOneAds,
    // findCatAds,
    deleteAds,
    addLogoLink,
    getSettingData,
    updataLogoLink,
    getVideosNews,
    getPdfNews,
    addComplaint,
    getComplaint,
    getComplaintId,
    ComplaintMail
};