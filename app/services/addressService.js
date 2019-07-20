const db = require('@app/models');

const addressService = {
  /**
   * get address by user_id
   *
   * @param user_id Integer
   */
  getAddressByUserId: async user_id => {
    const address = await db.Address.findOne({ where: { user_id } });

    return address;
  },

  /**
   * updates adress
   *
   * @param user_id Integer
   * @param addressData Object of addressData
   */
  updateAddress: async (user_id, addressData) => {
    const address = await addressService.getAddressByUserId(user_id);

    if (address) {
      await address.update({
        user_id: user_id,
        street: addressData.street,
        suite: addressData.suite,
        city: addressData.city,
        zipcode: addressData.zipcode,
        lat: addressData.geo.lat,
        lng: addressData.geo.lng,
      });

      return address;
    } else {
      return await addressService.createAddressInDB(user_id, addressData);
    }
  },

  /**
   * create address in db
   *
   * @param user_id Integer
   * @param addressData Object
   */
  createAddressInDB: async (user_id, addressData) => {
    const address = await db.Address.create({
      user_id: user_id,
      street: addressData.street,
      suite: addressData.suite,
      city: addressData.city,
      zipcode: addressData.zipcode,
      lat: addressData.geo.lat,
      lng: addressData.geo.lng,
    });

    return address;
  },
};

module.exports = addressService;
