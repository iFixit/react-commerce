import type { Strapi } from '@strapi/strapi';
import { getExportCSV } from './export-csv';
import { getImportCSV } from './import-csv';

export default ({ strapi }: { strapi: Strapi }) => ({
   exportCSV: getExportCSV(strapi),
   importCSV: getImportCSV(strapi),
});
