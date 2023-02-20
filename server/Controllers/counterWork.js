const News = require('../models/NewsModel');
const Admin = require('../models/adminModel');
const Category = require('../models/CategoryModel');
const subCategory = require('../models/subCategoryModel');
const subSubCat = require('../models/subSubCategory');
const ads = require('../models/advertisement');
const complaints = require('../models/complaintModel')


const counterApi = async (req, res) => {
    try {
        const newsNo = await News.countDocuments({ newsType: "textnews" });
        const videosNo = await News.countDocuments({ newsType: "video" });
        const pdfNo = await News.countDocuments({ newsType: "pdfNews" });
        const userNo = await Admin.countDocuments({ email: { $exists: true } });
        const categoryNo = await Category.countDocuments({ categoryName: { $exists: true } });
        const subCategoryNo = await subCategory.countDocuments({ category: { $exists: true }, categoryId: { $exists: true } });
        const subSubCatNo = await subSubCat.countDocuments({ subcategory: { $exists: true }, subcategoryId: { $exists: true } });
        const adsNo = await ads.countDocuments({ image: { $exists: true } });
        const complaintsNo = await complaints.countDocuments({ email: { $exists: true } })
        res.status(200).json({ status: 200, message: "count ge successfuly", newsNo, userNo, categoryNo, subCategoryNo, subSubCatNo, adsNo, videosNo, pdfNo, complaintsNo });
    }
    catch (error) {
        return res.status(503).json({ status: 503, message: 'Invalid Data' });
    }
}

module.exports = {
    counterApi
}



