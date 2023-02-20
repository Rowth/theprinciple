const subSubCat = require('../models/subSubCategory');
const News = require('../models/NewsModel');
const ads = require('../models/advertisement');

const addSubTwoCat = async (req, res) => {
    try {
         const id = req.body.id;
        const subOjet = {
            name: req.body.subSubName,
            category: req.body.cateName,
            categoryId: req.body.cateId,
            subcategory: req.body.subCateName,
            subcategoryId: req.body.subCateId,
            viewOrder: req.body.viewOrder
        }
        const options = { new: true };
        const existData = await subSubCat.findOne({ name: { $regex: subOjet.name, $options: 'i' } });
        if (id) {
            const upSubCat = await News.updateMany({ subSubCateId: id }, { $set: { subSubCateName: subOjet.name } });
            const upadsCatName = await ads.updateMany({ adsSubSubCateId: id }, { $set: { adsSubSubCateName: subOjet.name } });
             const upDate = await subSubCat.findByIdAndUpdate(id, subOjet, options);
            return res.status(200).json({ status: 200, message: 'subSubCategory Update Successfully' })
        }
        else {
            if (!existData) {
                const newCityName = await new subSubCat(subOjet).save();
                return res.status(200).json({ status: 200, message: 'subSubCategory Added Successfully' })
            }
            return res.status(201).json({ status: 401, message: 'Sub SubCategory already exist' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}
const paticularSubTwoCat = async (req, res) => {
    try { 
        let findData;
        if (req.query.type) {
            findData = await subSubCat.find({ subcategory: req.query.id }).sort({ viewOrder: 1, updatedAt: -1 });
        } else {
            findData = await subSubCat.find({ subcategoryId: req.query.id }).sort({ viewOrder: 1, updatedAt: -1 });
        }
        // const subSubCount = await subSubCat.find().count();


        if (findData.length > 0) {
            let counts  = findData.length;
            res.status(200).json({ findData, counts})
        }
        else {
            return res.status(200).json({ status: 401, message: 'Sub SubCategory not exist' });
        }
    }
    catch (error) {
        res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}



const getSubTwoCat = async (req, res) => {
    try {
        const findData = await subSubCat.find().sort({ name: 1 });
        // console.log(findData, "findData");
        // findData.forEach(async (ele, index) => {
        //     let updataData = await subSubCat.findByIdAndUpdate(ele._id, { viewOrder: index + 1 });
        //     console.log(updataData, "updataData")
        // })
        const subSubCount = await subSubCat.find().count();
        // const countt = await subSubCat.find();
        // console.log(countt, "countt----");
        // for (let i = 0; i <= countt.length; i++) {
        //     const findCategory = await News.find({ subSubCateId: countt[i]._id }).count();
        //     const updateCategory = await subSubCat.findByIdAndUpdate(countt[i]._id, { count: findCategory });
        //     console.log(updateCategory, "---------")
        // }
        if (findData.length == 0) {
            return res.status(401).json({ status: 401, message: 'Sub SubCategory not exist' })
        }
        else {
            res.status(201).json({ findData, subSubCount })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}


const deleteSubSubCat = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteCate = await subSubCat.findByIdAndDelete(id);
        if (!deleteCate) {
            return res.status(401).json({ status: 401, message: 'subsubCategory not exist' })
        }
        else {
            return res.status(200).json({ status: 200, message: 'Successfully subsubCategory updated' })
        }
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' })
    }
}

module.exports = {
    addSubTwoCat,
    paticularSubTwoCat,
    getSubTwoCat,
    deleteSubSubCat
}