import React from 'react'
import ErrorWindow from '../ErrorWindow'
import LoadingIcon from '../LoadingIcon'

type InnerWindowProps = {
  isLoading: boolean
  errMsg: string
}

const UIInnerWindow: React.FC<InnerWindowProps> = ({ isLoading, errMsg }) => {
  return (
    <div className="UIInnerWindow">
      {isLoading && <LoadingIcon />}
      {errMsg && <ErrorWindow errMsg={errMsg} />}
    </div>
  )
}

export default React.memo(UIInnerWindow)
