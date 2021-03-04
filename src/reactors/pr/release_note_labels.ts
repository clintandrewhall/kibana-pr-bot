import { missingLabelReactorFactory } from './factory'

export const releaseNoteLabels = missingLabelReactorFactory({
  id: 'releaseNoteLabels',
  context: 'prbot:release note labels',
  errorDesc: 'All PRs require a release_note:* label',
  labelFn: label => label.startsWith('release_note:'),
})
