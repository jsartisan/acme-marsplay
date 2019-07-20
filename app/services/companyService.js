const db = require('@app/models');

const companyService = {
  /**
   * get company by id
   *
   * @param company Integer
   */
  getCompanyById: async company_id => {
    const company = await db.Company.findOne({ where: { id: company_id } });

    return company;
  },

  /**
   * updates company
   *
   * @param company_id Integer
   * @param companydata Object of company
   */
  updateCompany: async (company_id, companyData) => {
    const company = await companyService.getCompanyById(company_id);

    if (company) {
      await company.update({
        name: companyData.name,
        catch_phrase: companyData.catchPhrase,
        bs: companyData.bs,
      });

      return company;
    } else {
      return await companyService.createCompanyInDB(companyData);
    }
  },

  /**
   * create company in db
   */
  createCompanyInDB: async companyData => {
    const company = await db.Company.create({
      name: companyData.name,
      catch_phrase: companyData.catchPhrase,
      bs: companyData.bs,
    });

    return company;
  },
};

module.exports = companyService;
