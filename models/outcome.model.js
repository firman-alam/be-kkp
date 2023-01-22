const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  const Outcome = sequelize.define('outcome', {
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
      set(val) {
        this.setDataValue('tanggal', moment(val).format('DD-MM-YYYY'));
      },
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

  return Outcome;
};
