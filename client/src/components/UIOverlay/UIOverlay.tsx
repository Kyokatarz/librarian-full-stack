import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../types/rootState'
import { UI } from '../../types/uiTypes'
import UIInnerWindow from '../UIInnerWindow'

import './UIOverlay.scss'

const UIOverlay: React.FC = () => {
  const uiState = useSelector<RootState, UI>((state) => state.ui)
  const { isLoading } = uiState
  const classList = isLoading ? 'UIOverlay active' : 'UIOverlay'

  return (
    <div className={classList}>
      <UIInnerWindow isLoading={uiState.isLoading} errMsg={uiState.errMsg} />
    </div>
  )
}

export default UIOverlay
