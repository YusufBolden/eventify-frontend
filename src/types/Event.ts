export interface Event {
  _id: string
  title: string
  date: string
  description?: string
  createdAt?: string
  updatedAt?: string
  user?: string
}

export interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  onEventCreated: (event: Event) => void
  onEventUpdated: (event: Event) => void
  editMode?: boolean
  existingEvent?: Event | null
}
