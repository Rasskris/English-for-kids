import { FC } from 'react';
import classnames from 'classnames';
import { MY_GITHUB_URL, RSS_SCHOOL_URL } from '../../../constants';
import styles from './Footer.module.scss';

export const Footer: FC = () => {
  const rssSchoolLinkStyles = classnames(styles.footer__link, styles.rssSchool);
  const githubLinkStyles = classnames(styles.footer__link, styles.github);

  return (
    <footer className={styles.footer}>
      <a href={RSS_SCHOOL_URL} target="_blank" className={rssSchoolLinkStyles} rel="noreferrer" />
      <p className={styles.creator}>2021, Kristina Rassoshenko</p>
      <a href={MY_GITHUB_URL} target="_blank" className={githubLinkStyles} rel="noreferrer" />
    </footer>
  );
};
