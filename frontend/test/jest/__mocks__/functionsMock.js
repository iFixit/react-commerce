/* global jest */

import * as AppContext from '@ifixit/app';

AppContext.useAppContext = jest
   .fn()
   .mockReturnValue({ ifixitOrigin: 'https://www.cominor.com' });
