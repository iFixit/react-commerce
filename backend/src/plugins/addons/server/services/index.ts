import type { Strapi } from '@strapi/strapi';
import seed from './seed';
import bulkOperations from './bulk-operations';
import contentTypes from './content-types';

const services = {
   seed,
   bulkOperations,
   contentTypes,
};

type Services = typeof services;

export const getAddonsService = <K extends keyof Services>(
   strapi: Strapi,
   serviceName: K
): ReturnType<Services[K]> => {
   return strapi.plugin('addons').service(serviceName);
};

export default services;
