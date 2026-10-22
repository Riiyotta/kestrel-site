import { useEffect } from 'react'

// /llms-txt -> /llms.txt (SPEC_PAGES_C template map: 308 on live). A router <Navigate> would only change the URL
// inside the SPA (and the catch-all would render the 404), so this does a hard replace to the static
// public/llms.txt. A real 308 belongs in the host config when this is deployed.
export default function LlmsTxtRedirect() {
  useEffect(() => {
    window.location.replace('/llms.txt')
  }, [])
  return null
}
