/** @jsx jsx */
import React from 'react'
import { css, jsx } from '@emotion/core'
import { CircularProgress } from "@material-ui/core"

const wrapperStyle = css`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Preloader: React.FC = () => (
  <div css={wrapperStyle}>
    <CircularProgress color='primary' />
  </div>
)
