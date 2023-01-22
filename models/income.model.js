const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define('income', {
    nama: {
      type: DataTypes.STRING,
    },
    nominal_tunai: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nominal_transfer: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    keterangan: {
      type: DataTypes.STRING,
    },
    kategori: {
      type: DataTypes.ENUM,
      values: [
        'kas',
        'ifthor',
        'kajian',
        'janaiz',
        'jumat berkah',
        'bakti sosial',
      ],
    },
    tanggal: {
      type: DataTypes.DATE,
      get() {
        return moment(this.getDataValue('tanggal')).format('DD-MM-YYYY');
      },
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });

  return Income;
};
