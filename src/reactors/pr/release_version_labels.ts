import { RELEASE_VERSION_LABEL_RE } from '../../lib'
import { missingLabelReactorFactory } from './factory'

export const releaseVersionLabels = missingLabelReactorFactory({
  id: 'releaseVersionLabels',
  context: 'prbot:release version labels',
  errorDesc: 'All PRs require at least one release version label',
  labelFn: label => RELEASE_VERSION_LABEL_RE.test(label),
})
