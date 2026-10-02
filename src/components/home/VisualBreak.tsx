import { RevealTitle } from '../ui/RevealTitle'
import './VisualBreak.css'

export function VisualBreak() {
  return (
    <section className="visual-break" aria-labelledby="visual-break-title">
      <div className="visual-break__pitch" aria-hidden="true" />
      <RevealTitle className="visual-break__title" id="visual-break-title">
        <span className="visual-break__line">El mejor plan</span>{' '}
        <span className="visual-break__line">es <span className="visual-break__pencil">encontrarnos.</span></span>
      </RevealTitle>
    </section>
  )
}
