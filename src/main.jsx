import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Don't let the browser restore the previous scroll offset on reload. The saved
// offset is applied while the route chunk is still loading, so it gets clamped
// into a document that's only a viewport tall — which parks the view squarely on
// the footer until the real content arrives and yanks it away. Every route here
// already starts at the top (see the scroll reset in App's AnimatedRoutes), so
// dropping restoration costs nothing and removes the flash.
//
// Hash URLs (/portfolio#logo-design and friends, linked from the services cards)
// are left on the browser default instead, so anything that currently gets those
// loads to their section keeps working — this fix deliberately doesn't change
// their behaviour either way. Assigned both ways because the flag persists for
// the whole session once set: a hash load after a hashless one must reset it.
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = window.location.hash ? 'auto' : 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
