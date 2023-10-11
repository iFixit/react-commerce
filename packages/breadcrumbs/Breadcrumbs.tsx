import {
   Flex,
   FlexProps,
   Link,
   Breadcrumb,
   BreadcrumbItem,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   MenuItemProps,
   IconButton,
   Text,
   BreadcrumbItemProps,
   LinkProps,
   useBreakpointValue,
} from '@chakra-ui/react';
import { FaIcon } from '@ifixit/icons';
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons/faChevronRight';
import { faEllipsis } from '@fortawesome/pro-solid-svg-icons/faEllipsis';
import { memo, useState, useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import { HiddenWrapEffect, useHiddenWrap } from './FlexHiddenWrap';

export type BreadcrumbItem = {
   label: string;
   url?: string;
};

export interface BreadCrumbsProps {
   breadCrumbs: BreadcrumbItem[];
   breadcrumbsToShow?: number;
   breadcrumbIcon?: JSX.Element;
}

type IFixitBreadcrumbItemProps = BreadcrumbItem & {
   isLast: boolean;
} & BreadcrumbItemProps;

export const BreadCrumbs = memo(function DynamicBreadCrumbs({
   breadCrumbs,
   breadcrumbsToShow,
   breadcrumbIcon = <DefaultBreadcrumbIcon />,
   ...flexProps
}: BreadCrumbsProps & FlexProps) {
   if (breadcrumbsToShow != undefined && breadcrumbsToShow <= 0) {
      throw new Error(
         'breadcrumbsToShow can only be undefined or must be greater than 0'
      );
   }

   const isStatic = !!breadcrumbsToShow;

   const visibleBreadCrumbs = isStatic
      ? breadCrumbs.slice(breadCrumbs.length - breadcrumbsToShow)
      : breadCrumbs;

   const hiddenBreadCrumbs = isStatic
      ? breadCrumbs.slice(0, breadCrumbs.length - breadcrumbsToShow)
      : [];

   const [wrappedBreadcrumbs, setWrappedBreadcrumbs] =
      useState<BreadcrumbItem[]>(hiddenBreadCrumbs);

   const wrappedChildrenEffect = useCallback(
      (children: HTMLElement[]) => {
         if (isStatic) {
            return;
         }
         const wrappedNames = new Set(
            children.map((c) => c.getAttribute('data-name'))
         );
         const wrapped = breadCrumbs.filter((b) => wrappedNames.has(b.label));
         setWrappedBreadcrumbs(() => wrapped);
      },
      [breadCrumbs, isStatic]
   );

   return (
      <Flex
         display="flex"
         flexShrink={1}
         flexGrow={1}
         alignItems="center"
         gap="6px"
         {...flexProps}
      >
         <IFixitCollapsedBreadcrumb
            breadCrumbs={wrappedBreadcrumbs}
            breadcrumbIcon={breadcrumbIcon}
         />
         <IFixitBreadcrumb
            breadCrumbs={visibleBreadCrumbs}
            breadcrumbIcon={breadcrumbIcon}
            wrappedChildrenEffect={wrappedChildrenEffect}
         />
      </Flex>
   );
});

function DefaultBreadcrumbIcon() {
   return (
      <Flex>
         <FaIcon
            icon={faChevronRight}
            h="2.5"
            display="flex"
            color="gray.400"
            mt="1px"
         />
      </Flex>
   );
}
const IFixitBreadcrumb = memo(function IFixitBreadcrumb({
   breadCrumbs,
   breadcrumbIcon,
   wrappedChildrenEffect,
}: Pick<BreadCrumbsProps, 'breadCrumbs' | 'breadcrumbIcon'> & {
   wrappedChildrenEffect: HiddenWrapEffect;
}) {
   const reversedBreadCrumbs = breadCrumbs.slice().reverse();

   const BreadCrumbItems = reversedBreadCrumbs.map((props, index) => {
      const isLastBreadCrumb = index === 0;
      return (
         <IFixitBreadcrumbItem
            key={props.label}
            spacing="6px"
            {...props}
            isLast={isLastBreadCrumb}
         />
      );
   });

   const hiddenWrapProps = useHiddenWrap({ wrappedChildrenEffect });

   return (
      <Breadcrumb
         separator={breadcrumbIcon}
         listProps={{
            padding: '0px',
            ...hiddenWrapProps,
            flexDirection: 'row-reverse',
            justifyContent: 'flex-end',
            height: '1.5em',
            minHeight: '20px',
         }}
      >
         {BreadCrumbItems}
      </Breadcrumb>
   );
}, isEqual);

const IFixitBreadcrumbItem = function IFixitBreadcrumbItem({
   url,
   label: name,
   isLast,
   ...breadcrumbItemProps
}: IFixitBreadcrumbItemProps) {
   const color = isLast ? 'gray.900' : 'gray.500';

   return (
      <BreadcrumbItem
         {...breadcrumbItemProps}
         isLastChild={isLast}
         data-name={name}
      >
         <Text
            as={url ? Link : undefined}
            noOfLines={1}
            href={url}
            fontWeight={isLast ? 500 : 400}
            color={color}
            _visited={{ color: color }}
            _hover={{ textDecoration: 'none' }}
         >
            {name}
         </Text>
      </BreadcrumbItem>
   );
};

const IFixitCollapsedBreadcrumb = function IFixitCollapsedBreadcrumb({
   breadCrumbs,
   breadcrumbIcon,
}: Pick<BreadCrumbsProps, 'breadCrumbs' | 'breadcrumbIcon'>) {
   const iconSize = useBreakpointValue({ base: '14px', sm: '16px' });

   if (!breadCrumbs.length) {
      return null;
   }

   const CollapsedBreadCrumbItems = breadCrumbs.map(({ label: name, url }) => {
      return (
         <IFixitCollapsedBreadcrumbItem url={url} label={name} key={name} />
      );
   });

   return (
      <>
         <Menu>
            <MenuButton
               as={IconButton}
               aria-label="More breadcrumbs"
               colorScheme="gray"
               background="gray.300"
               variant="solid"
               size="xs"
               marginRight="1"
               minHeight={{ base: '20px', sm: '24px' }}
               minWidth={{ base: '26px', sm: '32px' }}
               icon={
                  <FaIcon
                     icon={faEllipsis}
                     fontSize={iconSize}
                     color="gray.500"
                  />
               }
            />
            <MenuList zIndex={3}>{CollapsedBreadCrumbItems.reverse()}</MenuList>
         </Menu>
         {breadcrumbIcon}
      </>
   );
};

function IFixitCollapsedBreadcrumbItem({
   url,
   label: name,
   ...menuItemProps
}: BreadcrumbItem & MenuItemProps & LinkProps) {
   return (
      <MenuItem
         as={url ? Link : undefined}
         color="gray.900"
         _visited={{ color: menuItemProps.color || 'gray.900' }}
         _hover={{ textDecoration: 'none' }}
         fontSize="14px"
         href={url}
         {...menuItemProps}
      >
         {name}
      </MenuItem>
   );
}
