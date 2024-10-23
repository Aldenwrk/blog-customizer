import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	setCurrentState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	setCurrentState,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState<boolean>(false); //состояние открытия-закрытия
	const [tempState, setTempState] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);
	//состояние с выбранными в форме параметрами

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setTempState({ ...tempState, [key]: value });
	};

	const handleReset = () => {
		setTempState(defaultArticleState);
		setCurrentState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef,
		onClose: () => setOpen(false),
		onChange: setOpen,
	});

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton
					isOpen={isOpen}
					onClick={() => {
						setOpen(!isOpen);
					}}
				/>
				<aside
					className={clsx(styles.container, isOpen && styles.container_open)}>
					<form
						className={styles.form}
						onSubmit={(evt) => {
							evt.preventDefault();
							setCurrentState(tempState);
						}}>
						<Select
							title='Шрифт'
							selected={tempState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) => handleChange('fontFamilyOption', option)}
						/>
						<RadioGroup
							title='Размер шрифта'
							name='fontSizeOption'
							selected={tempState.fontSizeOption}
							options={fontSizeOptions}
							onChange={(option) => handleChange('fontSizeOption', option)}
						/>
						<Select
							title='Цвет шрифта'
							selected={tempState.fontColor}
							options={fontColors}
							onChange={(option) => handleChange('fontColor', option)}
						/>
						<Separator />
						<Select
							title='Цвет фона'
							selected={tempState.backgroundColor}
							options={backgroundColors}
							onChange={(option) => handleChange('backgroundColor', option)}
						/>
						<Select
							title='Ширина контента'
							selected={tempState.contentWidth}
							options={contentWidthArr}
							onChange={(option) => handleChange('contentWidth', option)}
						/>

						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								htmlType='reset'
								type='clear'
								onClick={handleReset}
							/>
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
