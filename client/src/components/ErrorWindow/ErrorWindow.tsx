import React from 'react'

type ErrorWindowProps = {
  errMsg: string
}
const ErrorWindow: React.FC<ErrorWindowProps> = ({ errMsg }) => {
  return (
    <div className="ErrorWindow">
      SOMETHING HAS GONE TERRIBLY WRONG - {errMsg}
    </div>
  )
}

export default ErrorWindow
