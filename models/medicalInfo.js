'use strict';
module.exports = function (sequelize, DataTypes) {
    var MedicalInfo = sequelize.define('MedicalInfo', {
        medicalInfoId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            field: 'medical_info_id'
        },
        dogId: {
            type: DataTypes.INTEGER,
            field: 'dog_id'
        },
        medicalInfoTypeId: {
            type: DataTypes.INTEGER,
            field: 'medical_info_type_id'
        },
        info: {
            type: DataTypes.TEXT,
            field: 'info'
        }
    }, {
        underscored: true,
        underscoredAll: true,
        version: true
    });

    // MedicalInfo.associate = models => {
    //     MedicalInfo.belongsTo(models.MedicalInfoType, {
    //         foreignKey: 'medical_info_type_id'
    //     });
    //     MedicalInfo.belongsTo(models.Dog, {
    //         foreignKey: 'dog_id'
    //     });
    // }

    return MedicalInfo;
};