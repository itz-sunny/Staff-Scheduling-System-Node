'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        allowNull: false,
        references: { model: 'users', key: 'id' },
      },
      workDate: {
        type: Sequelize.DATE,
        field: 'work_date',
        allowNull: false,
      },
      shiftHours: {
        type: Sequelize.INTEGER,
        field: 'shift_hours',
        allowNull: false,
        validate: {
          min: 1,
          max: 24,
        },
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        filed: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    });

    await queryInterface.addIndex('schedules', ['user_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('schedules');
  },
};
