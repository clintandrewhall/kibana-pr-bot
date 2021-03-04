import {
  hasCanvasOrDashboardLabel,
  LABEL_NEEDS_IMPACT,
  LABEL_IMPACT_PREFIX,
} from '../../../issue/teams/presentation'
import { missingLabelReactorFactory } from '../../factory'

export const needsImpactLabelReactor = missingLabelReactorFactory({
  id: 'presentation_team_pr_needs_impact',
  context: 'prbot:impact label',
  errorDesc: 'A Presentation Team PR requires a impact:* label',
  filterFn: pr => hasCanvasOrDashboardLabel(pr),
  labelFn: label =>
    label.startsWith(LABEL_IMPACT_PREFIX) && label !== LABEL_NEEDS_IMPACT,
})
