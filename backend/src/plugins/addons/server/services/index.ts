import type { Strapi } from '@strapi/strapi';
import seed from './seed';

const services = {
   seed,
};

type Services = typeof services;

export const getAddonsService = <K extends keyof Services>(
   strapi: Strapi,
   serviceName: K
): ReturnType<Services[K]> => {
   return strapi.plugin('addons').service(serviceName);
};

export default services;
