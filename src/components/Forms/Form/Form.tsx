import styles from './Form.module.css';

import FormInput from '../FormInput/FormInput';

import { FormInputData, FormProps } from '../../../interfaces/pointInterfaces';

import { useFormik } from 'formik';
import { createPointScehma } from '../../../schemas/schemas';
import { Edit_FORM_NAME } from '../../../constants/gloabalConstants';

export default function Form({ sourcePage, onSubmit, onClose, pointInfo }: FormProps) {
    let initialValues: FormInputData = {
        name: '',
        category: '',
        description: '',
        imageUrl: ''
    };

    if (sourcePage === Edit_FORM_NAME && pointInfo !== undefined) {
        initialValues = pointInfo;
    }

    const handleSubmit = (formData: FormInputData) => {
        onSubmit(formData);
    }

    const formik = useFormik({
        initialValues,
        validationSchema: createPointScehma,
        onSubmit: handleSubmit
    })

    return (
        <div onClick={onClose} className={styles['overlay']}>
            <div className={styles['wrapper']}>

                <h2 className={styles['title-wrapper']}>
                    <span className={styles['title']}>{sourcePage}</span>
                    <i className="fa-sharp fa-regular fa-location-dot"></i>
                </h2>

                <form onSubmit={formik.handleSubmit} className={styles['create-point-form']}>
                    <section className={styles['field-container']}>
                        <FormInput formik={formik} />
                    </section>

                    <button
                        type="submit"
                        className={styles['add-btn']}
                    >
                        {sourcePage} location
                    </button>
                </form>
            </div>
        </div>
    )
}
