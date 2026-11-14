import { useRef, useState } from 'react'
import type { ChangeEvent, DragEvent, KeyboardEvent } from 'react'
import './App.css'

type Step = { title: string; detail: string }

const STEPS: Step[] = [
  { title: 'Importer', detail: 'Dépose une vidéo dans le cadre ou choisis un fichier.' },
  { title: 'Couper', detail: 'Place le début et la fin du passage à garder.' },
  { title: 'Exporter pour TikTok', detail: 'Format vertical 1080 × 1920, MP4.' },
]

function formatSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} Ko`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} Go`
}

function isVideo(file: File): boolean {
  return file.type.startsWith('video/') || /\.(mp4|mov|m4v|webm|mkv)$/i.test(file.name)
}

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const accept = (candidate: File | undefined) => {
    if (!candidate) return
    if (!isVideo(candidate)) {
      setError(`« ${candidate.name} » n'est pas une vidéo. Choisis un fichier MP4, MOV ou WebM.`)
      return
    }
    setError(null)
    setFile(candidate)
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    accept(event.dataTransfer.files[0])
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    accept(event.target.files?.[0])
    event.target.value = ''
  }

  const openPicker = () => inputRef.current?.click()

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openPicker()
    }
  }

  const currentStep = file ? 1 : 0

  return (
    <div className="page">
      <header className="masthead">
        <h1 className="brand">Découpe</h1>
        <p className="tagline">Coupe un clip, sors-le en vertical. Tout reste sur ton ordinateur.</p>
      </header>

      <main className="bench">
        <div
          className={`frame${dragging ? ' is-dragging' : ''}${file ? ' has-file' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Déposer une vidéo ou choisir un fichier"
          onClick={openPicker}
          onKeyDown={onKeyDown}
          onDragOver={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <span className="frame-ratio" aria-hidden="true">9:16</span>
          {file ? (
            <div className="frame-body">
              <p className="frame-title">{file.name}</p>
              <p className="frame-meta">{formatSize(file.size)}</p>
              <p className="frame-hint">Clique pour choisir une autre vidéo.</p>
            </div>
          ) : (
            <div className="frame-body">
              <p className="frame-title">Dépose ta vidéo ici</p>
              <p className="frame-hint">ou clique pour choisir un fichier</p>
              <p className="frame-meta">MP4, MOV ou WebM</p>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="video/*,.mp4,.mov,.m4v,.webm,.mkv"
            hidden
            onChange={onChange}
          />
        </div>

        <section className="steps" aria-label="Étapes">
          <ol>
            {STEPS.map((step, index) => {
              const state = index < currentStep ? 'done' : index === currentStep ? 'current' : 'todo'
              return (
                <li key={step.title} className={`step is-${state}`} aria-current={state === 'current' ? 'step' : undefined}>
                  <span className="step-mark" aria-hidden="true">{index + 1}</span>
                  <div>
                    <h2 className="step-title">{step.title}</h2>
                    <p className="step-detail">{step.detail}</p>
                  </div>
                </li>
              )
            })}
          </ol>
          {error && (
            <p className="alert" role="alert">
              {error}
            </p>
          )}
        </section>
      </main>
    </div>
  )
}
