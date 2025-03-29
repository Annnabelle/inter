import {ReactNode} from 'react'
export interface ModalProps {
    closeModal?: ()=> void,
    openModal?: boolean,
    children?: ReactNode,
    title?: string,
    handleAction?: () => void
    handleDelete?: () => void,
    handleEdit?: () => void
    handleCancel?: () => void
    className?: string
}