import styled, { CreateStyled } from '@emotion/styled'
import { Theme as MuiTheme } from '@material-ui/core'

export interface Theme {
  palette: MuiTheme['palette'],
}

export default styled as CreateStyled<Theme>
