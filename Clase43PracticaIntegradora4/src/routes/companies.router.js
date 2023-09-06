import BaseRouter from './Router.js';
import companiesController from '../controllers/companies.controller.js';

export default class CompaniesRouter extends BaseRouter {
  init(){
    this.get('/',['SUPERADMIN'],companiesController.getCompanies);
    this.post('/',['SUPERADMIN'],companiesController.createCompany);
    this.get('/:cid',['SUPERADMIN','ADMIN','USER'],companiesController.getCompanyById);
    this.put('/:cid', ['ADMIN'], companiesController.updateCompany);
    this.delete('/:cid', ['SUPERADMIN'], companiesController.deleteCompany);
  }
}