import styles from './PointsOfInterestForm.module.css';

import FormInput from '../FormInput/FormInput';

import { PointOfInterestFormProps, FormInputData } from "../../interfaces/pointInterfaces";
import { createPointScehma } from '../../schemas/schemas';

import { useFormik } from "formik";

export default function PointsOfInterestForm({ onCreate, onClose }: PointOfInterestFormProps) {

  const handleCreate = (formData: FormInputData) => {
    onCreate(formData);
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      description: ''
    },
    validationSchema: createPointScehma,
    onSubmit: handleCreate
  })

  return (
    <div onClick={onClose} className={styles['overlay']}>
      <div className={styles['wrapper']}>

        <h2 className={styles['title-wrapper']}>
          <span className={styles['title']}>Create</span>
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
            Create location
          </button>
        </form>
      </div>
    </div>
  )
}


