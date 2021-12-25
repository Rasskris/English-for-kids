/* eslint-disable no-nested-ternary */
import Image from 'next/image';
import errorImage from '../../public/images/error.png';
import styles from '../styles/Wrapper.module.scss';

const Error = ({ statusCode }) => {
  return (
    <section className={styles.wrapper}>
      <p className={styles.wrapper}>
        {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
        <Image alt="Computer" src={errorImage} placeholder="blur" width={500} height={500} />
      </p>
    </section>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
