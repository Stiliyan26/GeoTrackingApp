import { useAuthContext } from '../../../contexts/AuthContext';
import { DeleteDialogProps } from '../../../interfaces/pointInterfaces';
import styles from './DeleteDialog.module.css';

export default function DeleteDialog({
  point,
  handleDeletePoint,
  handleCloseDialog
}: DeleteDialogProps) {
  const { username } = useAuthContext();

  return (
    <div onClick={(e) => handleCloseDialog(e)} className={styles['overlay']}>
      <div className={styles['dialog-container']}>
        <div className={styles['title-container']}>
          <h2 className={styles['title']}>{username} are you sure you want to delete {point.name}?</h2>

          <hr></hr>
        </div>

        <div className={styles['buttons']}>
          <button 
            onClick={(e) => handleDeletePoint(point.id, username, e)} 
            className={styles['confirm-btn']}
          >
              Yes
          </button>

          <button 
            onClick={(e) => handleCloseDialog(e)} 
            className={styles['cancel-btn']}
          >
            No
          </button>
        </div>
      </div>
    </div>
  )
}
