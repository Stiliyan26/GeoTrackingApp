import styles from './PointsOfInterestForm.module.css';

import { useState } from "react";
import { PointOfInterest } from "../../interfaces/pointInterfaces";

interface PointsOfInterestFormProps {
    onSubmit: (formData: PointOfInterest) => void
}

export default function PointsOfInterestForm({ onSubmit }: PointsOfInterestFormProps) {
    const [formData, setFormData] = useState<PointOfInterest>({
        name: '',
        description: '',
        category: '',
        position: [0, 0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className={styles['modal-overlay']}>
        <div className={styles['form-container']}>
          <form onSubmit={handleSubmit}>
            <h2>Add Point of Interest</h2>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
              Description:
              <textarea name="description" value={formData.description} onChange={handleChange} />
            </label>
            <label>
              Category:
              <input type="text" name="category" value={formData.category} onChange={handleChange} />
            </label>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    )
}


