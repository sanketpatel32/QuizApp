import styles from './AnalyticsDashboardItem.module.css';

import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoShareSocial } from "react-icons/io5";

const AnalyticsDashboardItem = () => {
    return (
        <tr className={styles.container}>
            <td>1</td>
            <td>Quiz 1</td>
            <td>01 sept 2024</td>
            <td>232</td>
            <td className={styles.functionDiv}>
                <BiEdit className={styles.editIcon}/>
                <IoShareSocial className={styles.shareIcon} />
                <RiDeleteBin6Fill className={styles.deleteIcon} />
            </td>
            <td>Question Wise Analysis</td>
        </tr>

    )
}

export default AnalyticsDashboardItem;