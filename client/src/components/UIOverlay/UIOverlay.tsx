import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../types/rootState'
import { UI } from '../../types/uiTypes'
import UIInnerWindow from '../UIInnerWindow'

import './UIOverlay.scss'

const UIOverlay: React.FC = () => {
  const uiState = useSelector<RootState, UI>((state) => state.ui)
  const { isLoading, errMsg } = uiState
  const classList = isLoading ? 'UIOverlay active' : 'UIOverlay'
  // const onClickHandler = () => {
  //   const overlay = document.querySelector('.UIOverlay')
  //   overlay!.classList.remove('active')
  // }

  // useEffect(() => {
  //   const overlay = document.querySelector('.UIOverlay')
  //   if (isLoading || errMsg) {
  //     overlay!.classList.add('active')
  //   }
  // }, [uiState])

  return (
    <div className={classList}>
      <UIInnerWindow isLoading={uiState.isLoading} errMsg={uiState.errMsg} />
    </div>
  )
}

export default UIOverlay
