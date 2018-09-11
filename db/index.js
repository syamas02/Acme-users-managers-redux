const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const User = conn.define('user', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    notNull: true,
    validate: {
      notEmpty: true,
    },
  },
});

User.belongsTo(User, { as: 'manager' });

const syncAndSeed = () => {
  return conn
    .sync({ force: true })
    .then(() =>
      Promise.all([
        User.create({ name: 'moe' }),
        User.create({ name: 'larry' }),
        User.create({ name: 'curly' }),
      ])
    )
    .then(([moe, larry, curly]) => {
      moe.setManager(larry);
      curly.setManager(larry);
      larry.setManager(curly);
    });
};

module.exports = {
  syncAndSeed,
  models: {
    User,
  },
};
