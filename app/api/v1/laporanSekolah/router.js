const router = require("express").Router();
const {
    authenticateUser,
    authorizeRoles
} = require("../../../middlewares/auth");
const {
    getAllLaporan,
    getOneLaporan,
    createLaporan,
    ubahStatusVerifikasi,
    kembalikanSuratSaatVerifikasi
} = require("./controller");

const { uploadMiddleware } = require("../../../utils/multer");

router.get("/laporansekolah", authenticateUser, getAllLaporan);
router.get("/laporansekolah/:id", authenticateUser, getOneLaporan);

router.post(
    "/laporansekolah",
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
      },
    ]),
    createLaporan
);

router.put(
    "/laporan/ubah-status-verifikasi/:id",
    authenticateUser,
    authorizeRoles("kepala_sekolah"),
    ubahStatusVerifikasi
);

router.put(
    "/laporan/kembalikan-surat-saat-verifikasi/:id",
    authenticateUser,
    authorizeRoles("kepala_sekolah"),
    kembalikanSuratSaatVerifikasi
);

module.exports = router;