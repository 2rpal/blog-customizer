import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select/Select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	OptionType,
	ArticleStateType,
	defaultArticleState,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	state: ArticleStateType;
	onSubmit: (state: ArticleStateType) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	state,
	onSubmit,
	onReset,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement | null>(null);

	const [formState, setFormState] = useState<ArticleStateType>(state);

	useEffect(() => {
		setFormState(state);
	}, [state]);

	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleChangeFont = (option: OptionType) => {
		setFormState((prev) => {
			return {
				...prev,
				fontFamilyOption: option,
			};
		});
	};

	const handleChangeFontSize = (option: OptionType) => {
		setFormState((prev) => {
			return {
				...prev,
				fontSizeOption: option,
			};
		});
	};

	const handleChangeFontColor = (option: OptionType) => {
		setFormState((prev) => {
			return {
				...prev,
				fontColor: option,
			};
		});
	};

	const handleChangeBgColor = (option: OptionType) => {
		setFormState((prev) => {
			return {
				...prev,
				backgroundColor: option,
			};
		});
	};

	const handleChangeContentWidth = (option: OptionType) => {
		setFormState((prev) => {
			return {
				...prev,
				contentWidth: option,
			};
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		onReset();
	};

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen((prev) => !prev);
				}}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<div className={styles.params_container}>
						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={handleChangeFont}
						/>
						<RadioGroup
							title='Размер шрифта'
							name={'1'}
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={handleChangeFontSize}
						/>
						<Select
							title='Цвет шрифта'
							options={fontColors}
							selected={formState.fontColor}
							onChange={handleChangeFontColor}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={handleChangeBgColor}
						/>
						<Select
							title='Цвет фона'
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={handleChangeContentWidth}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
