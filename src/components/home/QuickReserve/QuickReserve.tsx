import { ChangeEvent, FormEvent, useState } from 'react'
import './QuickReserve.css'

type ReserveFormState = {
  name: string
  date: string
  time: string
  players: string
}

const INITIAL_FORM: ReserveFormState = {
  name: '',
  date: '',
  time: '',
  players: '10',
}

export function QuickReserve() {
  const [formData, setFormData] = useState<ReserveFormState>(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const field = event.target.name as keyof ReserveFormState
    const value = event.target.value

    setFormData((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setFormData(INITIAL_FORM)
  }

  return (
    <section className="quick-reserve section-shell" id="reserva" aria-labelledby="reserva-title">
      <div className="quick-reserve__card">
        <p className="quick-reserve__label">Reserva express</p>
        <h2 id="reserva-title" className="quick-reserve__title">
          Saca tu turno en menos de un minuto
        </h2>
        <p className="quick-reserve__description">
          Este bloque ya queda listo para conectar con tu backend de reservas cuando arranques esa parte.
        </p>

        <form className="quick-reserve__form" onSubmit={handleSubmit}>
          <label className="quick-reserve__field">
            <span>Nombre</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </label>

          <label className="quick-reserve__field">
            <span>Fecha</span>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </label>

          <label className="quick-reserve__field">
            <span>Horario</span>
            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
          </label>

          <label className="quick-reserve__field">
            <span>Jugadores</span>
            <select name="players" value={formData.players} onChange={handleChange}>
              <option value="10">10 jugadores</option>
              <option value="12">12 jugadores</option>
              <option value="14">14 jugadores</option>
            </select>
          </label>

          <button type="submit" className="quick-reserve__submit">
            Reservar ahora
          </button>
        </form>

        {submitted ? (
          <p className="quick-reserve__feedback" role="status">
            Reserva enviada. El siguiente paso es conectarlo al endpoint real.
          </p>
        ) : null}
      </div>
    </section>
  )
}
