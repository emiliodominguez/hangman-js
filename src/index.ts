import inquirer from 'inquirer';
import { getWords, setHangman } from './shared';
import { ALPHABET, HANGMAN_LIMBS, WIN, LOSE } from './constants';
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
		.then(({ letter }) => {
			if (letter.length > 1) {
				console.log(
					ERROR(
						"\n Either you didn't enter a letter or entered more than one... \n",
					),
				);
				setInquirer();
			}

			if (ALPHABET.indexOf(letter) !== -1) {
				if (word.split('').includes(letter)) {
					if (!correctLetters.includes(letter)) {
						correctLetters.push(letter);
					}
				} else {
					if (!wrongLetters.includes(letter)) {
						wrongLetters.push(letter);
					}
				}

				checkWinningWord();
			}
		});
}

function setConsoleMessage(state: string = ''): void {
	'use strict';
	process.stdout.write('\u001b[3J\u001b[2J\u001b[1J');

	console.clear();

	switch (state) {
		case WIN:
			console.log(TITLE('You won!!! \n'));
			break;
		case LOSE:
			console.log(
				`${DANGER('Game over... \n')}`,
				`\nThe word was ${WARNING(word.toUpperCase())}\n`,
			);
			break;
		default:
			console.log(
				`${TITLE(`Guess the word...${DANGER(' OR HANG!')}`)} \n`,
			);
			setHangman(wrongLetters.length);
			console.log(`\n ${wordToGuess.toUpperCase()} \n`);
			break;
	}
}

function setInitialGuess(): void {
	word.split('').forEach(() => (wordToGuess += '_ '));
}

function setGuessedLetters(): void {
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

function checkWinningWord(): void {
	setGuessedLetters();

	if (wordToGuess.replace(/\s/g, '').toLowerCase() === word) {
		gameOver = true;
		setConsoleMessage(WIN);
	} else if (wrongLetters.length === HANGMAN_LIMBS) {
		gameOver = true;
		setConsoleMessage(LOSE);
	}

	if (gameOver) {
		askPlayAgain();
	} else {
		setInquirer();
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

	setInitialGuess();
	setConsoleMessage();
	setInquirer();
}

startGame();
