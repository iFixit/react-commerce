import { RefinementListFacet } from '../RefinementListFacet';
import { useRefinementListFacet } from '../useRefinementListFacet';
import { Panel } from './Panel';

export type RefinementListFacetPanelProps = {
   attribute: string;
   isOpen: boolean;
};

export function RefinementListFacetPanel({
   attribute,
   isOpen,
}: RefinementListFacetPanelProps) {
   const { items, refine, canToggleShowMore, isShowingMore, toggleShowMore } =
      useRefinementListFacet({ attribute });
   return (
      <Panel
         isOpen={isOpen}
         data-testid={`facet-panel${isOpen ? '-open' : ''}`}
      >
         <RefinementListFacet
            attribute={attribute}
            items={items}
            refine={refine}
            canToggleShowMore={canToggleShowMore}
            isShowingMore={isShowingMore}
            onToggleShowMore={toggleShowMore}
         />
      </Panel>
   );
}
