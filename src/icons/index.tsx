import { SvgIcon } from '@material-ui/core'

import { ReactComponent as VikingSvgIcon } from './viking-helmet.svg';

export function VikingIcon(props: {}) {
    return <SvgIcon fontSize='large' component={VikingSvgIcon} viewBox="0 0 600 476.6" {...props} />
}