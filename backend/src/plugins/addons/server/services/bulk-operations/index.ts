import '@strapi/strapi';
import { getExportCSV } from './export-csv';
import { getImportCSV } from './import-csv';

export default ({ strapi }: { strapi: Strapi.Strapi }) => ({
   exportCSV: getExportCSV(strapi),
   importCSV: getImportCSV(strapi),
});
