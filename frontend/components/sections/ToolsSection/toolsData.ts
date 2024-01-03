import { ChakraComponent } from '@chakra-ui/react';
import {
   SuctionHandle,
   Spudger,
   OpeningTool,
   ReverseTweezers,
   HallberdSpudger,
   Jimmy,
   MetalSpudger,
   OpeningPick,
   FlexExtension,
   BluntTweezers,
   AntistaticWristStrap,
   AnglesTweezers,
   _64BitDriver,
} from './tool-shapes';

export type ToolType =
   | 'opening-pick'
   | 'anti-static-wrist-strap'
   | 'metal-spudger'
   | 'halberd-spudger'
   | 'spudger'
   | '64-bit-driver'
   | 'jimmy'
   | 'flex-extension'
   | 'reverse-tweezers'
   | 'angles-tweezers'
   | 'blunt-tweezers'
   | 'opening-tool'
   | 'suction-handle';

export type ToolData = {
   type: ToolType;
   imageStyle: {
      left?: string;
      top?: string;
      width?: string;
      height?: string;
   };
   imageSize: {
      width?: number;
      height?: number;
   };
   shape: ChakraComponent<any, {}>;
   imageUrl: string;
   title: string;
   description: string;
};

export const toolsData: ToolData[] = [
   {
      type: 'opening-pick',
      imageStyle: {
         left: '-3px',
         width: '115px',
         height: '110px',
      },
      imageSize: {
         width: 115,
         height: 110,
      },
      shape: OpeningPick,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/opening-pick.png',
      title: 'Opening Tool',
      description:
         'Gets into the tightest cracks without scratching or marking your workpiece',
   },
   {
      type: 'anti-static-wrist-strap',
      imageStyle: {
         left: '-6px',
         top: '-5px',
         width: '124px',
         height: '331px',
      },
      imageSize: {
         width: 124,
         height: 331,
      },
      shape: AntistaticWristStrap,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/asws.png',
      title: 'Anti-Static Wrist Strap',
      description:
         'Protects your electronics from electrostatic discharge (ESD) damage during repairs',
   },
   {
      type: 'metal-spudger',
      imageStyle: {
         left: '-4px',
         top: '-2px',
         width: '29px',
         height: '486px',
      },
      imageSize: {
         width: 29,
         height: 486,
      },
      shape: MetalSpudger,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/metal-spudger.png',
      title: 'Metal Spudger',
      description:
         'Dual-tipped metal spudger for more powerful prying, scraping, and probing',
   },
   {
      type: 'halberd-spudger',
      imageStyle: {
         left: '-2px',
         top: '-2px',
         width: '30px',
         height: '389px',
      },
      imageSize: {
         width: 30,
         height: 389,
      },
      shape: HallberdSpudger,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/halberd.png',
      title: 'Halberd Spudger',
      description:
         'Anti-static spudger with a blade and pointed hook for hooking, scraping, and separating',
   },
   {
      type: 'spudger',
      imageStyle: {
         left: '-6px',
         top: '-4px',
         width: '29px',
         height: '395px',
      },
      imageSize: {
         width: 29,
         height: 395,
      },
      shape: Spudger,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/spudger.png',
      title: 'Spudger',
      description:
         'Anti-static tool with pointed and flat ends for safely prying cables and sensitive electronics',
   },
   {
      type: '64-bit-driver',
      imageStyle: {
         left: '-5px',
         top: '-5px',
         width: '49px',
         height: '297px',
      },
      imageSize: {
         width: 49,
         height: 297,
      },
      shape: _64BitDriver,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/driver-new.png',
      title: '64 Bit Driver',
      description:
         'Ergonomic handle provides plenty of torque with swivel cap and magnetized bit holder',
   },
   {
      type: 'jimmy',
      imageStyle: {
         left: '-7px',
         top: '-5px',
         width: '91px',
         height: '366px',
      },
      imageSize: {
         width: 91,
         height: 366,
      },
      shape: Jimmy,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/jimmy.png',
      title: 'Jimmy',
      description:
         'Flexible steel blade with an ergonomic handle for precise and powerful prying',
   },
   {
      type: 'flex-extension',
      imageStyle: {
         left: '-5px',
         top: '-4px',
         width: '33px',
         height: '385px',
      },
      imageSize: {
         width: 33,
         height: 385,
      },
      shape: FlexExtension,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/flex-extension.png',
      title: 'Flex Extension',
      description:
         'Extend your reach and get more torque to screws in hard-to-reach places',
   },
   {
      type: 'reverse-tweezers',
      imageStyle: {
         left: '-5px',
         top: '-3px',
         width: '36px',
         height: '415px',
      },
      imageSize: {
         width: 36,
         height: 415,
      },
      shape: ReverseTweezers,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/reverse-tweezers.png',
      title: 'Reverse Tweezers',
      description:
         'Spring-action tweezers hold cables or components hands-free',
   },
   {
      type: 'angles-tweezers',
      imageStyle: {
         left: '-1px',
         top: '-2px',
         width: '49px',
         height: '351px',
      },
      imageSize: {
         width: 49,
         height: 351,
      },
      shape: AnglesTweezers,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/angled-tweezers.png',
      title: 'Angled Tweezers',
      description:
         'ESD-safe tweezers with angled, pointed tips for hard-to-reach places',
   },
   {
      type: 'blunt-tweezers',
      imageStyle: {
         left: '-3px',
         top: '-2px',
         width: '34px',
         height: '352px',
      },
      imageSize: {
         width: 34,
         height: 352,
      },
      shape: BluntTweezers,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/blunt-tweezers.png',
      title: 'Blunt Tweezers',
      description:
         'ESD-safe tweezers with flat, rounded, blunt tips for delicate and precise manipulation',
   },
   {
      type: 'opening-tool',
      imageStyle: {
         left: '-6px',
         top: '-5px',
         width: '39px',
         height: '253px',
      },
      imageSize: {
         width: 39,
         height: 253,
      },
      shape: OpeningTool,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/opening-tool.png',
      title: 'Opening Pick',
      description:
         'Ultra-thin pick for slicing adhesive and separating screens and cases',
   },
   {
      type: 'suction-handle',
      imageStyle: {
         left: '-5px',
         top: '-6px',
         width: '142px',
         height: '158px',
      },
      imageSize: {
         width: 142,
         height: 158,
      },
      shape: SuctionHandle,
      imageUrl:
         'https://assets.cdn.ifixit.com/static/images/fpp/pro-tech-toolkit/tools/suction-handle.png',
      title: 'Suction Handle',
      description:
         'Light-duty suction cup for removing phone and tablet glass panels',
   },
];
