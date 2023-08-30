import { Edit_FORM_NAME } from "../../../constants/gloabalConstants";
import { SourceFormProps } from "../../../interfaces/pointInterfaces";
import Form from "../Form/Form";

export default function EditPoint({ onSubmit, onClose, pointInfo }: SourceFormProps) {
    
    return <Form
        sourcePage={Edit_FORM_NAME}
        onSubmit={onSubmit}
        onClose={onClose}
        pointInfo={pointInfo}
    />
}
