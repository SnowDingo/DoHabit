import styles from './Card.module.css';
import { type ReactNode } from 'react';
import CardHeader from './CardHeader';
import clsx from 'clsx';

interface CardProps {
	title?: string;
	description?: string;
	extra?: ReactNode;
	badgeIcon?: ReactNode;
	badgeColors?: { bg: string; color: string; size?: string };
	children: React.ReactNode;
	className?: string;
	childrenClassName?: string;
}

function Card(props: CardProps) {
	const {
		title,
		description,
		extra,
		badgeIcon,
		badgeColors,
		children,
		className,
		childrenClassName
	} = props;

	return (
		<div className={clsx(styles.card, className)}>
			{title && (
				<CardHeader
					title={title}
					description={description}
					extra={extra}
					badgeIcon={badgeIcon}
					badgeColors={badgeColors}
				/>
			)}

			{children && (
				<div className={clsx(styles.body, childrenClassName)}>
					{children}
				</div>
			)}
		</div>
	);
}

export { Card };