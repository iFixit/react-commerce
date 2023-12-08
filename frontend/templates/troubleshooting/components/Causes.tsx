import { Box, Link, Square } from '@chakra-ui/react';
import { faList } from '@fortawesome/pro-solid-svg-icons';
import { FaIcon } from '@ifixit/icons';
import { useRef } from 'react';
import { useScrollToActiveEffect } from '../toc';
import {
   TOCRecord,
   useTOCBufferPxScrollOnClick,
   useTOCContext,
} from '../tocContext';

function isIntroData(data: TOCEntry): data is IntroData & TOCRecord {
   return data.type === 'Introduction';
}
function isCauseData(data: TOCEntry): data is SolutionData & TOCRecord {
   return data.type === 'Solution';
}

function isConclusionData(data: TOCEntry): data is ConclusionData & TOCRecord {
   return data.type === 'Conclusion';
}

export function Causes(props: React.ComponentProps<typeof Box>) {
   const intros: (IntroData & TOCRecord)[] = useTOCContext<TOCEntry>()
      .getItems()
      .filter(isIntroData);
   const solutions: (SolutionData & TOCRecord)[] = useTOCContext<TOCEntry>()
      .getItems()
      .filter(isCauseData);
   const conclusions: (ConclusionData & TOCRecord)[] = useTOCContext<TOCEntry>()
      .getItems()
      .filter(isConclusionData);

   return (
      <Box
         as="nav"
         color="brand.500"
         mt={4}
         fontSize="sm"
         fontWeight="medium"
         {...props}
      >
         {intros.map((intro) => (
            <Intro key={intro.uniqueId} {...intro} />
         ))}
         {solutions.map((cause, index) => (
            <Cause key={cause.uniqueId} causeNumber={index + 1} {...cause} />
         ))}
      </Box>
   );
}

function Cause({
   uniqueId,
   heading,
   id,
   active,
   causeNumber,
}: SolutionData & TOCRecord) {
   const { onClick } = useTOCBufferPxScrollOnClick(id);
   const ref = useRef<HTMLAnchorElement>(null);

   useScrollToActiveEffect(ref, active);

   return (
      <Link
         href={`#${uniqueId}`}
         onClick={onClick}
         ref={ref}
         color={{
            mdPlus: active ? 'brand.500' : 'gray.500',
         }}
         {...linkStyles}
      >
         <Square
            bgColor={{
               base: 'brand.500',
               mdPlus: active ? 'brand.500' : 'gray.400',
            }}
            {...squareStyles}
         >
            {causeNumber}
         </Square>
         <Box as="span">{heading}</Box>
      </Link>
   );
}

function Intro({ uniqueId, heading, id, active }: IntroData & TOCRecord) {
   const { onClick } = useTOCBufferPxScrollOnClick(id);
   const ref = useRef<HTMLAnchorElement>(null);

   useScrollToActiveEffect(ref, active);

   return (
      <Link
         href={`#${uniqueId}`}
         onClick={onClick}
         ref={ref}
         color={{
            mdPlus: active ? 'brand.500' : 'gray.500',
         }}
         {...linkStyles}
      >
         <Square className="intro" {...squareStyles}>
            <FaIcon icon={faList} color="brand.500" />
         </Square>
         <Box as="span">{heading}</Box>
      </Link>
   );
}

export type SectionData = {
   id: string;
   heading: string;
};

export type SolutionData = SectionData & {
   type: 'Solution';
   causeNumber?: number;
};

export type IntroData = SectionData & {
   type: 'Introduction';
};

export type ConclusionData = SectionData & {
   type: 'Conclusion';
};

export type SectionRecord = IntroData | SolutionData | ConclusionData;
export type TOCEntry = SectionRecord & TOCRecord;

const linkStyles = {
   display: 'flex',
   alignItems: 'center',
   fontWeight: 'semibold',
   py: 1,
   pl: { base: 0, mdPlus: 4 },
   pr: { base: 0, mdPlus: 3 },
   borderBottomRightRadius: 'md',
   borderTopRightRadius: 'md',
   lineHeight: 'shorter',
   transition: 'all var(--chakra-transition-duration-fast) ease-out',
   sx: {
      '@media (min-width: 769px)': {
         _hover: {
            textDecoration: 'none',
            bgColor: 'brand.100',
            color: 'brand.700',
            '& svg': {
               fill: 'white',
            },
         },
      },
   },
};

const squareStyles = {
   color: 'white',
   size: { base: 6, mdPlus: 5 },
   border: '1px solid',
   borderColor: { base: 'brand.700', mdPlus: 'gray.500' },
   borderRadius: 'md',
   mr: 2,
   transition:
      'background-color var(--chakra-transition-duration-fast) ease-out',
   sx: {
      '&.intro': {
         borderColor: 'brand.700',
         color: 'white',
      },
   },
};
