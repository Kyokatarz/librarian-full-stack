import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../types/rootState'
import { UI } from '../../types/uiTypes'
import ErrorWindow from './components/ErrorWindow'
import LoadingIcon from './components/LoadingIcon'

import './UIOverlay.scss'

const UIOverlay: React.FC = () => {
  const uiState = useSelector<RootState, UI>((state) => state.ui)
  const { isLoading, errMsg } = uiState
  const classList = isLoading ? 'UIOverlay active' : 'UIOverlay'

  return (
    <div className={classList}>
      <div className="UIInnerWindow">
        {isLoading && <LoadingIcon />}
        {errMsg && <ErrorWindow errMsg={errMsg} />}
      </div>
    </div>
  )
}

export default UIOverlay
