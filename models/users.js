const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    _id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    ten_dang_nhap: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    mat_khau: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    ho_ten: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    dia_chi: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    dien_thoai: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    hinh_anh: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    id_quyen: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '2'
    }
}, {
    tableName: 'nguoi_dung',
    timestamps: false
});

module.exports = User;
