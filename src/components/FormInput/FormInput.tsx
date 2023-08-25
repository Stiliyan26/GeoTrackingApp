import styles from './FormInput.module.css';

import { FormInputProps, FormInputInfo } from '../../interfaces/pointInterfaces';

import { classNameValidator } from '../../services/styleServices';

export default function FormInput({ formik }: FormInputProps) {
    const initialHtmlType = 'input';

    const fields: FormInputInfo[] = [
        {
            id: 'name',
            label: 'Name',
            htmlType: 'input',
            name: 'name',
            value: formik.values.name,
            placeholder: 'Type name: ',
        },
        {
            id: 'category',
            label: 'Category',
            htmlType: 'input',
            name: 'category',
            value: formik.values.category,
            placeholder: 'Type category: ',
        },
        {
            id: 'description',
            label: 'Description',
            htmlType: 'textarea',
            name: 'description',
            value: formik.values.description,
            placeholder: 'Type description: ',
        }
    ];

    const getFormikErrorByName: {
        [key: string]: string | undefined
    } = {
        name: formik.errors.name,
        category: formik.errors.category,
        description: formik.errors.description
    }

    const getIsFormikTouchedByName: {
        [key: string]: boolean | undefined
    } = {
        name: formik.touched.name,
        category: formik.touched.category,
        description: formik.touched.description
    }

    
    const getAllFields = () => {
        return fields.map((field, index) => (
            <div key={index} className={styles['input-container']}>
                <label className={styles['label']}>{field.label}</label>
                {
                    field.htmlType === initialHtmlType
                        ? <input
                            id={field.id}
                            className={classNameValidator(
                                styles,
                                !!(getFormikErrorByName[field.name] && getIsFormikTouchedByName[field.name]),
                                'input',
                                'invalid-input'
                            )}
                            type="text"
                            name={field.name}
                            value={field.value}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={field.placeholder}
                        />
                        : <textarea
                            id={field.id}
                            className={classNameValidator(
                                styles,
                                !!(getFormikErrorByName[field.name] && getIsFormikTouchedByName[field.name]),
                                'textarea',
                                'invalid-textarea'
                            )}
                            name={field.name}
                            value={field.value}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder={field.placeholder}
                        />
                }
                
                {(getFormikErrorByName[field.name] && getIsFormikTouchedByName[field.name]) 
                    && (
                        <span className={styles['err-msg']}>
                            {getFormikErrorByName[field.name]}
                        </span>
                    )
                }
            </div>
        ));
    }

    return (
        <div>
            {fields.length > 0 && getAllFields()}
        </div>
    )
}
