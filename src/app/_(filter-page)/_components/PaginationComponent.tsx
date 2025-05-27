import React from 'react'
import Image from 'next/image'
import rightArrow from '../../../../public/assets/icons/rightArrowCircle.tsx.svg'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationData {
  current_page: number
  has_next_page: boolean
  next_page_number: number
  has_previous_page: boolean
  previous_page_number: number
  total_pages: number
  total_items: number
  first_item: number
  last_item: number
}

interface PaginationComponentProps {
  paginationData: PaginationData
}

function PaginationComponent({ paginationData }: PaginationComponentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', pageNumber.toString())
    router?.push(`?${params.toString()}`)
  }

  const renderPageNumbers = () => {
    const pages = []
    const currentPage = paginationData.current_page
    const totalPages = paginationData.total_pages

    // Always show first page
    pages.push(
      <div
        key={1}
        className={`rounded-full flex min-w-7 h-7 items-center bg-white justify-center border border-solid ${
          currentPage === 1 ? 'border-blue-500' : 'border-gray-300'
        } cursor-pointer`}
        onClick={() => handlePageChange(1)}
      >
        01
      </div>
    )

    // Show ellipsis if there are many pages before current page
    if (currentPage > 3) {
      pages.push(<div key="ellipsis1">...</div>)
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(
        <div
          key={i}
          className={`rounded-full flex min-w-7 h-7 bg-white items-center justify-center border border-solid ${
            currentPage === i ? 'border-blue-500' : 'border-gray-300'
          } cursor-pointer`}
          onClick={() => handlePageChange(i)}
        >
          {i.toString().padStart(2, '0')}
        </div>
      )
    }

    // Show ellipsis if there are many pages after current page
    if (currentPage < totalPages - 2) {
      pages.push(<div key="ellipsis2">...</div>)
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(
        <div
          key={totalPages}
          className={`rounded-full bg-white flex min-w-7 h-7 items-center justify-center border border-solid ${
            currentPage === totalPages ? 'border-blue-500' : 'border-gray-300'
          } cursor-pointer`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages.toString().padStart(2, '0')}
        </div>
      )
    }

    return pages
  }

  return (
    <div className="flex gap-2  items-center text-[12px]">
      {/* Left Arrow */}
      <Image
        src={rightArrow}
        alt="Left Arrow"
        width={15}
        height={15}
        style={{ transform: 'rotate(180deg)' }}
        className={`cursor-pointer bg-white rounded-[50%]  ${!paginationData.has_previous_page ? 'opacity-50' : ''}`}
        onClick={() => paginationData.has_previous_page && handlePageChange(paginationData.previous_page_number)}
      />

      {renderPageNumbers()}

      {/* Right Arrow */}
      <Image
        src={rightArrow}
        alt="Right Arrow"
        width={15}
        height={15}
        className={`cursor-pointer bg-white rounded-[50%] ${!paginationData.has_next_page ? 'opacity-50' : ''}`}
        onClick={() => paginationData.has_next_page && handlePageChange(paginationData.next_page_number)}
      />
    </div>
  )
}

export default PaginationComponent
