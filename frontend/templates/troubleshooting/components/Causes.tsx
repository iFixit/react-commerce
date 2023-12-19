import {
   Box,
   Heading,
   HeadingProps,
   Link,
   Square,
   useToken,
} from '@chakra-ui/react';
import { faList, faCircleNodes } from '@fortawesome/pro-solid-svg-icons';
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

export function Causes({
   hasRelatedPages,
   ...props
}: { hasRelatedPages: boolean } & React.ComponentProps<typeof Box>) {
   const items = useTOCContext<TOCEntry>().getItems();

   const intros: (IntroData & TOCRecord)[] = items.filter(isIntroData);
   const solutions: (SolutionData & TOCRecord)[] = items.filter(isCauseData);
   const conclusions: (ConclusionData & TOCRecord)[] =
      items.filter(isConclusionData);

   return (
      <>
         <TOCHeading>Troubleshooting</TOCHeading>
         <Box
            as="nav"
            color="brand.500"
            fontSize="sm"
            fontWeight="medium"
            {...props}
         >
            {intros.map((intro) => (
               <Intro key={intro.uniqueId} {...intro} />
            ))}
            <TOCHeading>Causes</TOCHeading>
            {solutions.map((cause, index) => (
               <Cause key={cause.uniqueId} causeNumber={index + 1} {...cause} />
            ))}
            {(conclusions.length || hasRelatedPages) && (
               <TOCHeading>Conclusion</TOCHeading>
            )}
            {conclusions.map((conclusion) => (
               <Conclusion key={conclusion.uniqueId} {...conclusion} />
            ))}
            {hasRelatedPages && <Problem />}
         </Box>
      </>
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
         <Square className="hasIcon" {...squareStyles}>
            <FaIcon icon={faList} color="brand.500" />
         </Square>
         <Box as="span">{heading}</Box>
      </Link>
   );
}

function Conclusion({
   uniqueId,
   heading,
   id,
   active,
}: ConclusionData & TOCRecord) {
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
         <Square className="hasIcon" {...squareStyles}>
            <FaIcon icon={faCircleNodes} color="brand.500" />
         </Square>
         <Box as="span">{heading}</Box>
      </Link>
   );
}

function Problem() {
   return (
      <Link
         href={`#related-problems`}
         {...linkStyles}
         sx={{
            [`@media (min-width: ${useToken('breakpoints', 'mdPlus')})`]: {
               display: 'none',
            },
         }}
      >
         <Square className="hasIcon" {...squareStyles}>
            <FaIcon icon={faCircleNodes} color="brand.500" />
         </Square>
         <Box as="span">Related Problems</Box>
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
   fontSize: { base: 'sm', mdPlus: 'xs' },
   mr: 2,
   transition:
      'background-color var(--chakra-transition-duration-fast) ease-out',
   sx: {
      '&.hasIcon': {
         backgroundColor: 'white',
         borderColor: 'brand.700',
         fontSize: 'sm',
      },
   },
};

function TOCHeading({
   children,
}: {
   children: React.ReactNode & HeadingProps;
}) {
   return (
      <Heading
         as="h3"
         fontSize={{ base: '20px', mdPlus: 'sm' }}
         fontWeight={{ base: 'semibold', mdPlus: 'medium' }}
         my={3}
         pl={{ mdPlus: 4 }}
         color="gray.900"
         sx={{
            '&:first-child': {
               mt: 1,
            },
         }}
      >
         {children}
      </Heading>
   );
}
