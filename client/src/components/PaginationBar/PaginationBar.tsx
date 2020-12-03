import './PaginationBar.scss'

import React from 'react'
import { Pagination } from 'react-bootstrap'

type PaginationBar = {
  page: number
  size: number
  setPage: (pageNumber: number) => void
}

const PaginationBar: React.FC<PaginationBar> = ({ page, size, setPage }) => {
  let active = page
  let items = []

  for (let i = 0; i < size; i++) {
    items.push(
      <Pagination.Item key={i} active={i === active} onClick={() => setPage(i)}>
        {i + 1}
      </Pagination.Item>
    )
  }

  return <Pagination className="PaginationBar">{items}</Pagination>
}

export default React.memo(PaginationBar)
