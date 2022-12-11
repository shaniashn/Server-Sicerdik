const mongoose = require('mongoose');

const uploadSuratSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model("uploadSurat", uploadSuratSchema);