'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Schedule.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id',
        allowNull: false,
      },
      workDate: {
        type: DataTypes.DATE,
        field: 'work_date',
        allowNull: false,
      },
      shiftHours: {
        type: DataTypes.INTEGER,
        field: 'shift_hours',
        allowNull: false,
        validate: {
          min: 1,
          max: 24,
        },
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        filed: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['user_id'],
        },
      ],
      sequelize,
      modelName: 'Schedule',
    },
  );
  return Schedule;
};
