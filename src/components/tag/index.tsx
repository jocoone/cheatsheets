import styles from '../../../styles/Tag.module.scss';

type Props = {
  tag: string;
};

export default function Tag({ tag }: Props) {
  return <span className={styles.tag}>{tag}</span>;
}
