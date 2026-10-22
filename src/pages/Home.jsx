import Hero from '../components/Hero.jsx'
import Proof from '../components/Proof.jsx'
import Compare from '../components/Compare.jsx'
import Tools from '../components/Tools.jsx'
import Confidence from '../components/Confidence.jsx'
import Integrations from '../components/Integrations.jsx'
import Playbook from '../components/Playbook.jsx'
import Stories, { AssistantNote } from '../components/Stories.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Proof />
      {/* "Gradient Flow Section" (CLONE_SPEC §8): column wrapper with overflow hidden holding §8–§12 */}
      <div data-section="gradient-flow" className="flex w-full flex-col overflow-hidden">
        <Compare />
        <Tools />
        <Confidence />
        <Integrations />
        <Playbook />
      </div>
      <Stories />
      <AssistantNote />
    </>
  )
}
