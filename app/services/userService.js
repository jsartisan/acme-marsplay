const axios = require('axios');

const config = require('@config');
const db = require('@app/models');
const companyService = require('./companyService');
const addressService = require('./addressService');

const userService = {
  /**
   * scrapes users data from json placeholder
   */
  scrapeUserFromJsonPlacehoder: async () => {
    const { baseUrl } = config.services.jsonplaceholder;

    try {
      const { data: users } = await axios.get(`${baseUrl}/users`);

      userService.saveUsersInDB(users);
    } catch (e) {
      console.log(e);
      throw new Error('Something went wrong while scraping users');
    }
  },

  /**
   * check if user exists by id
   *
   * @param String
   */
  doesUserExistsByJsonPhID: async jsonph_id => {
    const user = await userService.getUserByJsonPhID(jsonph_id);

    if (!user) return false;

    return true;
  },

  /**
   * get user by jsonph_id
   *
   * @param String jsonph_id of user
   */
  getUserByJsonPhID: async jsonph_id => {
    const user = await db.User.findOne({
      where: { jsonph_id },
    });

    return user;
  },

  /**
   * create user in db
   *
   * @param userData Object of user
   * @param company Model Company
   */
  createUserInDB: async (userData, company) => {
    const user = await db.User.create({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
      company_id: company.id,
      jsonph_id: userData.id,
    });

    return user;
  },

  /**
   * save users in DB
   *
   * @param users Array of users
   */
  saveUsersInDB: async users => {
    for (let i = 0; i < users.length; i++) {
      const userData = users[i];

      const doesUserExists = await userService.doesUserExistsByJsonPhID(userData.id);

      if (doesUserExists === false) {
        const company = await companyService.createCompanyInDB(userData.company);
        const user = await userService.createUserInDB(userData, company);
        const address = await addressService.createAddressInDB(user.id, userData.address);
      } else {
        const user = await userService.getUserByJsonPhID(userData.id);
        await companyService.updateCompany(user.company_id, userData.company);
        await addressService.updateAddress(user.id, userData.address);

        await userService.updateUser(user, userData);
      }
    }
  },

  /**
   * update users
   *
   * @param user Model
   * @param userData Object
   */
  updateUser: async (user, userData) => {
    return await user.update({
      name: userData.name,
      username: userData.username,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
    });
  },
};

module.exports = userService;
