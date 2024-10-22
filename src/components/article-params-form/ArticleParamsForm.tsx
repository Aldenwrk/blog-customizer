import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	currentState: ArticleStateType;
	setCurrentState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentState,
	setCurrentState,
}: ArticleParamsFormProps) => {
	const [open, setOpen] = useState<boolean>(false); //состояние открытия-закрытия
	const [tempState, setTempState] = useState<ArticleStateType>(currentState);
	//состояние с выбранными в форме параметрами

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setTempState({ ...tempState, [key]: value });
	};

	return (
		<>
			<ArrowButton
				isOpen={open}
				onClick={() => {
					setOpen(!open);
				}}
			/>
			<aside className={clsx(styles.container, open && styles.container_open)}>
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
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
