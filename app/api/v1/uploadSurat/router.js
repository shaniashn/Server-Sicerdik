const router = require("express").Router();

const {
    authenticateUser,
    authorizeRoles
} = require("../../../middlewares/auth");

const {
    getAllUploadedFiles,
    getOneUploadedFile,
    uploadFile
} = require("./controller");

const { uploadMiddleware } = require("../../../utils/multer");

router.get("/uploadedfile", authenticateUser, getAllUploadedFiles);
router.get("/uploadedfile/:id", authenticateUser, getOneUploadedFile);
router.post("/uploadfile", 
            authenticateUser,
            authorizeRoles("staff_sekolah"),
            uploadMiddleware.fields([
                {
                    name: "surat_pindah",
                    maxCount: 1,
                },
                {
                    name: "surat_ortu",
                    maxCount: 1,
                },
                {
                    name: "surat_plh",
                    maxCount: 1,
                }
            ]),
            uploadFile
);

module.exports = router;

