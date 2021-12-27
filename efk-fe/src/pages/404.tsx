import Image from 'next/image';
import notFound from '../../public/images/notFound.png';
import styles from '../styles/Wrapper.module.scss';

const Custom404 = () => {
  return (
    <section className={styles.wrapper}>
      <h1>404 - Page Not Found</h1>
      <Image alt="Cat" src={notFound} placeholder="blur" width={500} height={500} />
    </section>
  );
};

export default Custom404;
