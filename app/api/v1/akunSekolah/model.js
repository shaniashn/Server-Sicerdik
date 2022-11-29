const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { model, Schema } = mongoose;

let akunSekolahSchema = Schema(
    {
        nama_sekolah: {
            type: String,
            required: [true, 'Nama sekolah belum diisi!']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'E-mail belum diisi!']
        },
        password: {
            type: String,
            required: [true, 'Password belum diisi!'],
            minLength: 6
        },
        nik: {
            type: String,
            required: [true, 'NIK harus diisi!']
        },
        nip: {
            type: String,
            required: [true, 'NIP harus diisi!']
        },
        role: {
            type: String,
            enum: ['staff', 'kepala_sekolah']
        },
        statusAkun: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

akunSekolahSchema.pre('save', async (next) => {
    const Akun = this;
    if (Akun.isModified('password')){
        Akun.password = await bcrypt.hash(Akun.password, 12);
    }
    next();
});

akunSekolahSchema.methods.comparePassword = async (canditatePassword) => {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

module.exports = model('akunSekolah', akunSekolahSchema);