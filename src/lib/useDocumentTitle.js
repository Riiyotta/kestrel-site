import { useEffect } from 'react'

// Sets document.title while a page is mounted and restores the previous title on unmount.
export default function useDocumentTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    return () => {
      document.title = prev
    }
  }, [title])
}
