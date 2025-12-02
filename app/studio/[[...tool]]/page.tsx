// app/studio/[[...tool]]/page.tsx
import config from '../../../sanity.config'
import SanityStudioWrapper from '../../../components/SanityStudioWrapper' // Import the new wrapper

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  // Pass the config to the wrapper. The wrapper will handle filtering any unwanted props.
  return <SanityStudioWrapper config={config} />
}