import ReactGA from 'react-ga'

let init = false

export function logPageView() {
  const gaTrackingId = process.env.REACT_APP_GA_TRACKING_ID
  if (process.env.NODE_ENV !== 'production' || !gaTrackingId) {
    return null
  }
  if (!init) {
    console.log('Init Google Analytics:', gaTrackingId)
    init = true
    ReactGA.initialize(gaTrackingId)
  }
  const page = window.location.pathname + window.location.search
  ReactGA.set({ page })
  ReactGA.pageview(page)
  return null
}
