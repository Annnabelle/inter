import React from 'react'
import { Modal } from 'antd'
import { FaRegTrashAlt } from 'react-icons/fa'
import { BiEditAlt } from "react-icons/bi";
import { ModalProps } from '../../types/events';
import './styles.sass'

const ModalWindow: React.FC<ModalProps> = ({children, ...props}) => {
        
  return (
     <Modal
        centered
        title={
            <div className='modal-heading-container'>
                <div className="modal-heading-title">
                    <h3 className="title">{props?.title}</h3>
                    <div className="modal-heading-title-icon">
                        {props?.handleDelete && (
                            <div className="modal-heading-title-icon-trash">
                                <FaRegTrashAlt
                                    onClick={props?.handleDelete}
                                    className='svg-trash'
                                />
                            </div>
                        )}
                        {props?.handleEdit && (
                            <div className="modal-heading-title-icon-edit">
                                <BiEditAlt 
                                    onClick={props?.handleEdit}
                                    className='svg-edit'
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        }
        className={`modal-window ${props?.className}`}
        open={props?.openEventModal}
        onCancel={props?.closeEventModal}
        footer={null} 
        >
        {children}
    </Modal>
  )
}

export default ModalWindow