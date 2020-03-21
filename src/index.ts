import inquirer from 'inquirer';
import { getWords, setFiglet, setHangman } from './shared';
import { LOGGER, ALPHABET, HANGMAN_LIMBS, WIN, LOSE } from './constants';
import { TITLE, DANGER, WARNING, ERROR } from './chalk';

let word: string;
let wordToGuess: string;
let correctLetters: Array<string>;
let wrongLetters: Array<string>;
let gameOver: boolean = true;

function setInquirer(): void {
	inquirer
		.prompt([
			{
				name: 'letter',
				message: 'Choose a letter',
				type: 'input',
			},
		])
		.then(({ letter }) => getAnswer(letter));
}

function getAnswer(letter: string): void {
	if (!letter) {
		LOGGER(ERROR('\n You need to enter a letter... \n'));
	} else if (letter.length > 1) {
		LOGGER(ERROR('\n You can enter just one letter... \n'));
	} else if (
		correctLetters.includes(letter) ||
		wrongLetters.includes(letter)
	) {
		LOGGER(ERROR("\n You've already used that letter... \n"));
	} else {
		if (ALPHABET.indexOf(letter) !== -1) {
			if (word.split('').includes(letter)) {
				correctLetters.push(letter);
			} else {
				wrongLetters.push(letter);
			}

			setLetters();
			checkWinningWord();
		} else {
			LOGGER(ERROR('\n You can only use letters... \n'));
		}
	}

	if (!gameOver) setInquirer();
}

function checkWinningWord(): void {
	if (wordToGuess.replace(/\s/g, '').toLowerCase() === word) {
		gameOver = true;
		setConsoleMessage(WIN);
	} else if (wrongLetters.length === HANGMAN_LIMBS) {
		gameOver = true;
		setConsoleMessage(LOSE);
	}

	if (gameOver) askPlayAgain();
}

function setLetters(): void {
	wordToGuess = '';

	word.split('').forEach((letter: string) => {
		if (correctLetters.includes(letter)) {
			wordToGuess += `${letter} `;
		} else {
			wordToGuess += '_ ';
		}
	});

	setConsoleMessage();
}

function setConsoleMessage(state: string = ''): void {
	'use strict';
	process.stdout.write('\u001b[3J\u001b[2J\u001b[1J');

	console.clear();

	switch (state) {
		case WIN:
			LOGGER(TITLE('YOU WON! \n'));
			break;
		case LOSE:
			LOGGER(
				`${DANGER('GAME OVER \n')}`,
				`\nThe word was ${WARNING(word.toUpperCase())}\n`,
			);
			break;
		default:
			LOGGER(`${TITLE(`Guess the word...${DANGER(' OR HANG!')}`)} \n`);
			setHangman(wrongLetters.length);
			LOGGER(`\n ${wordToGuess.toUpperCase()} \n`);
			break;
	}
}

function askPlayAgain(): void {
	inquirer
		.prompt([
			{
				name: 'confirm',
				message: 'Do you want to play again?',
				type: 'confirm',
			},
		])
		.then(({ confirm }) => {
			if (confirm) {
				startGame();
			} else {
				process.exit();
			}
		});
}

async function startGame(): Promise<void> {
	word = await getWords();
	wordToGuess = '';
	correctLetters = [];
	wrongLetters = [];
	gameOver = false;

	word.split('').forEach(() => (wordToGuess += '_ '));
	setConsoleMessage();
	setInquirer();
}

setFiglet('Hangman');
setTimeout(startGame, 1000);
