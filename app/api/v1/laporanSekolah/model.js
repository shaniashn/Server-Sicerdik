const mongoose = require("mongoose");

const laporanSekolahSchema = new mongoose.Schema({
    tanggal_naskah_masuk: {
        type: Date,
        required: [true, "Masukkan Tanggal Naskah Dibuat"]
    },
    nama_siswa: {
        type: String,
        required: [true, "Masukkan Nama Siswa"]
    },
    nisn_siswa: {
        type: String,
        required: [true, "Masukkan NISN Siswa"],
        minLength: 3,
        maxLength: 50
    },
    nomor_laporan: {
        type: String,
        required: [true, "Masukkan nomor laporan"]
    },
    surat_pindah: {
        type: String,
        required: [
          true,
          "Upload surat pindah/surat masuk",
        ],
    },
    surat_ortu: {
      type: String,
      required: [true, "Upload surat permohonan ortu"],
    },
    surat_plh: {
      type: String,
    },
    status_verifikasi: {
      type: Boolean,
      default: false
    },
    status_ditolak_verifikasi: {
      type: Boolean,
      default: false,
    },
    komentar_verifikasi: {
      type: String,
      default: "",
    },
});

module.exports = mongoose.model("LaporanSekolah", laporanSekolahSchema);
