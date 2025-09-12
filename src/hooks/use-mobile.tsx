
import { useCallback, useEffect, useState } from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Initialize with server-side value if possible
    if (typeof window !== 'undefined') {
      return window.innerWidth < MOBILE_BREAKPOINT
    }
    return false
  })

  // Add a debounce function to avoid excessive rerenders
  const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>
    return function(this: any, ...args: any[]) {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn.apply(this, args), ms)
    }
  }

  const handleResize = useCallback(
    debounce(() => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      }
    }, 250),
    []
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set initial value
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      
      // Add event listener for window resize
      window.addEventListener("resize", handleResize)
      
      // Clean up
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [handleResize])

  return isMobile
}
