import styles from './BackupPasswordForm.module.css';
import { useState, type SubmitEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button, useDialogStore } from '@shared/ui';

interface BackupPasswordFormProps {
	variant: 'import' | 'export';
	onSubmit: (password?: string) => void;
	onClose?: () => void;
}

/**
 * Password input form for backing up or restoring application data.
 */
function BackupPasswordForm(props: BackupPasswordFormProps) {
	const {
		variant,
		onSubmit,
		onClose
	} = props;

	const { t } = useTranslation();
	const closeDialog = useDialogStore((s) => s.close);

	const [password, setPassword] = useState('');
	const [isVisible, setIsVisible] = useState(false);

	const isExport = variant === 'export';
	const trimmedPassword = password.trim();

	// Export allows empty password (unencrypted), import strictly requires value
	const isValid = isExport
		? trimmedPassword.length === 0 || trimmedPassword.length >= 6
		: trimmedPassword.length >= 6;

	const handleSubmit: SubmitEventHandler = (e) => {
		e.preventDefault();
		onSubmit(password);
		setPassword('');
		closeDialog();
	};

	const handleClose = () => {
		closeDialog();
		onClose?.();
	};

	return (
		<form
			className={styles.form}
			onSubmit={handleSubmit}
		>
			<div className={styles.inputWrapper}>
				<input
					type={isVisible ? 'text' : 'password'}
					autoComplete='current-password'
					value={password}
					className={styles.input}
					onChange={(e) => setPassword(e.target.value)}
					placeholder={t('menu.dataManagement.backup.export.passwordPlaceholder')}
				/>

				<Button
					variant='secondary'
					onClick={() => setIsVisible(!isVisible)}
					disabled={!password}
				>
					{isVisible ? <FaEyeSlash /> : <FaEye />}
				</Button>
			</div>

			<div className={styles.buttons}>
				<Button
					variant='secondary'
					onClick={handleClose}
				>
					{t('common.cancel')}
				</Button>

				<Button
					type='submit'
					disabled={!isValid}
				>
					{variant === 'export'
						? t('menu.dataManagement.backup.export.dialogs.passwordPrompt.submitBtn')
						: t('common.continue')}
				</Button>
			</div>
		</form>
	);
}

export { BackupPasswordForm };