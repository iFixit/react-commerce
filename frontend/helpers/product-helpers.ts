import { IFIXIT_ORIGIN } from '@config/env';

export function getProductPath(handle: string) {
   switch (handle) {
      case 'pro-tech-toolkit':
         return `${IFIXIT_ORIGIN}/Store/Tools/Pro-Tech-Toolkit/IF145-307`;
      case 'manta-driver-kit-112-bit-driver-kit':
         return `${IFIXIT_ORIGIN}/Store/Tools/Manta-Driver-Kit--112-Bit-Driver-Kit/IF145-392`;
      default:
         return `/products/${handle}`;
   }
}
