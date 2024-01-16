const db = require("../models");
const Quiz = db.quizzes;
// CREATE: untuk menambahkan data kedalam tabel quiz
exports.create = async (req, res) => {

    try {
        const data = await Quiz.create(req.body)
        res.json({
            message: "quiz created succesfully.",
            data: data,
        })
        } catch (error) {
            res.status(500).json({
                message: error.message ,
                dat: null,
            });
    }
}
// READ : menampilkan atau mengambil semua data quiz sesuai model dari database
exports.getAll = async(req,res) => {
    try {
        const quizzes = await Quiz.findAll()
        res.json({
            message: "Quizzes retrieved successfully.",
            data: quizzes,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data: null,
        });
    }
};
//Mengubah data sesuai id yang dikirimkan
exports.update = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true})
        quiz.update(req.body, {
            where: {id}
        })
        res.json({
            message:"Quizzes updated successfully.",
            data: quiz,
            });
    } catch (error) {
        res.status(500).json({
            message: error.message || "some error occurred while retrieving quiz",
            data: null,
         });
    }
}
// Menghapus data berdasarkan id yang dikirimkan
exports.delete = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })

        quiz.destroy()

        res.json({
            message: "Quiz deleted successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Some Error Occurred While retrieving quiz",
            data: null,
        });
    }
}
//mengambil data sesuai id yang di kirimkan
exports.findOne = async (req, res) => {
    const id = req.params.id
    try {
        const quiz = await Quiz.findByPk(id, { rejectOnEmpty: true })
        res.json({
            message: `Quizzes retrieved succcessfully with id=${id}.`,
            data: quiz,
            });
    } catch (error) {
        res.status(500).json({
            message: error.message || "some error occured while retrieving quiz",
            data: null,
         });
    }

};
//menampilkan atau mengambil semua data quiz berdasarkan category terntentu 
exports.getByCategoryId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where : {
            categoryId: id
        }
    })
    res.json({
        message: `Quizzes retrieved successfully with categoryId=${id}.`,
        data: quizzes,
    });
} 
//menampilkan atau mengambil semmua data quiz berdasarkan level tertentu
exports.getByLevelId = async (req, res) => {
    const id = req.params.id
    const quizzes = await Quiz.findAll({
        where : {
            levelId: id
        }
    })
    res.json({
        message: `Quizzes retrieved successfully with levelId=${id}.`,
        data: quizzes,
    });
}
  