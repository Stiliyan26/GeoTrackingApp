import Form from "../Form/Form";

import { CREATE_FORM_NAME } from "../../../constants/gloabalConstants";
import { SourceFormProps } from "../../../interfaces/pointInterfaces";

export default function CreatePoint({ onSubmit, onClose }: SourceFormProps) {

  return <Form 
    sourcePage={CREATE_FORM_NAME} 
    onSubmit={onSubmit} 
    onClose={onClose} 
  />
}


