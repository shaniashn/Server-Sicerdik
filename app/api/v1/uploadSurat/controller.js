const UploadSurat = require("./model");
const fs = require("fs");

const getAllUploadedFiles = async (req, res, next) => {
    try {
      const result = await UploadSurat.find();

      res.json({
        data: result
      })
    } catch (error) {
      next(error);
    }
};

const getOneUploadedFile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await UploadSurat.findOne({ _id: id });

        if(!result){
            console.log("No file with the id", id);
        }

        res.json({ data: result });
    } catch (error) {
        next(error);
    }
}

const uploadFile = async (req, res, next) => {
    try {
        console.log("req.files >>>> ", req.files);
        console.log("path surat_pindah", req.files["surat_pindah"][0].filename);
        console.log(["path surat_ortu"][0].filename);

        if(!req.files){
            console.log("Ada file yang tidak diupload");
        } else {
            let result;
            const adaSuratPlh = req.files["surat_plh"] ? true : false;

            if(adaSuratPlh){
                result = new UploadSurat({
                    surat_pindah: req.files["surat_pindah"][0].filename,
                    surat_ortu: req.files["surat_ortu"][0].filename,
                    surat_plh: req.files["surat_plh"][0].filename
                });
            } else {
                result = new UploadSurat({
                    surat_pindah: req.files["surat_pindah"][0].filename,
                    surat_ortu: req.files["surat_ortu"][0].filename
                })
            }

            await result.save();

            res.json({
                data: result
            })
        }

    } catch (error) {
        next(error);
    }
};

module.exports = { 
    getAllUploadedFiles, 
    getOneUploadedFile, 
    uploadFile 
};