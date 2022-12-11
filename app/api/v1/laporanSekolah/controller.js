const LaporanSekolah = require("./model"); 
const fs = require("fs");

const getAllLaporan = async (req, res, next) => {
    try{
        const result = await LaporanSekolah.find();
        
        res.json({
            data: result
        })
    } catch (error){
        next(error);
    }
};

const createLaporan = async (req, res, next) => {
    try {
        const {
            tanggal_naskah_masuk,
            nama_siswa,
            nisn_siswa,
            nomor_laporan
        } = req.body;

        console.log("req.files >>>> ", req.files);
        console.log("path surat_pindah", req.files["surat_pindah"][0].filename);
        console.log(["path surat_ortu"][0].filename);

        if(!req.files){
            console.log("Ada file yang tidak diupload");
        } else{
            let result;
            const adaSuratPlh = req.files["surat_plh"] ? true : false;

            if (adaSuratPlh) {
                result = new LaporanSekolah({
                    tanggal_naskah_masuk,
                    nama_siswa,
                    nisn_siswa,
                    nomor_laporan,
                    surat_pindah: req.files["surat_pindah"][0].filename,
                    surat_ortu: req.files["surat_ortu"][0].filename,
                    surat_plh: req.files["surat_plh"][0].filename,
                });
            } else {
                result = new LaporanSekolah({
                    tanggal_naskah_masuk,
                    nama_siswa,
                    nisn_siswa,
                    nomor_laporan,
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

const getOneLaporan = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await LaporanSekolah.findOne({ _id: id });
      if (!result) {
        console.log("No Laporan Sekolah with the id ", id);
      }
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
};

const ubahStatusVerifikasi = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      const result = await LaporanSekolah.findOne({ _id: id });
  
      if (!result) {
        console.log("No Laporan Sekolah with the id ", id);
      }
      result.status_verifikasi = !result.status_verifikasi;
      await result.save();
      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  };

const kembalikanSuratSaatVerifikasi = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { komentar_verifikasi } = req.body;
    const result = await LaporanSekolah.findOne({ _id: id });

    if (!result) {
      console.log("No Laporan Sekolah with the id ", id);
    }

    console.log("komentar : ", komentar_verifikasi);

    result.komentar_verifikasi = komentar_verifikasi;
    result.status_ditolak_verifikasi = !result.status_ditolak_verifikasi;
    // result.status_revisi = true;
    await result.save();
    res.json({ data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
    getAllLaporan,
    getOneLaporan,
    createLaporan,
    ubahStatusVerifikasi,
    kembalikanSuratSaatVerifikasi
};
