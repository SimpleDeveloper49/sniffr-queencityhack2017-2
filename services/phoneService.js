const models = require("../models/");

module.exports = PhoneService = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      models.Phone.findAll().then(result => {
        resolve(result);
      });
    });
  },
  findById: phoneId => {
    return new Promise((resolve, reject) => {
      models.Phone
        .find({
          where: {
            phone_id: phoneId
          }
        })
        .then(result => {
          resolve(result);
        });
    });
  },
  create: phone => {
    return new Promise((resolve, reject) => {
      models.Phone
        .create({
          phoneNumber: phone.phoneNumber
        })
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  update: (phoneId, phone) => {
    var that = this;
    return new Promise((resolve, reject) => {
      models.Phone
        .findOne({ where: { phone_id: phoneId } })
        .then(function(obj) {
          if (obj) {
            obj
              .update(phone)
              .then(updateCount => {
                resolve();
              })
              .catch(err => {
                reject(err);
              });
          } else {
            that
              .create(phone)
              .then(() => {
                resolve();
              })
              .catch(err => {
                reject(err);
              });
          }
        });
    });
  },
  delete: phoneId => {
    return new Promise((resolve, reject) => {
      models.Phone
        .destroy({
          where: {
            phone_id: phoneId
          }
        })
        .then(count => {
          resolve(count);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};
