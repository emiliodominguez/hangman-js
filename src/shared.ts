import fetch from 'node-fetch';
import figlet from 'figlet';
import { WOOD, ROPE, METAL, SKIN, PANTS } from './chalk';

function getRandomNumber(max: number): number {
	return Math.floor(Math.random() * max);
}

async function getWords(): Promise<string> {
	return await fetch('https://www.randomlists.com/data/words.json')
		.then(response => response.json())
		.then(({ data }) => data[getRandomNumber(data.length)])
		.catch((error: Error) => console.log(error));
}

function setFiglet(text: string): void {
	figlet.text(
		text,
		{
			font: 'Electronic',
			horizontalLayout: 'default',
			verticalLayout: 'default',
		},
		(err, data) => {
			if (err) {
				console.log('Something went wrong...');
				// console.dir(err);
				return;
			}

			console.log(data);
		},
	);
}

function setHangman(limb: number): void {
	switch (limb) {
		case 1: {
			console.log(
				` ${METAL(' =========== ')} \n`,
				`${WOOD('|||')}        ${ROPE('|')}    \n`,
				`${WOOD('|||')}       ${SKIN('(xx)')}  \n`,
				`${WOOD('|||')}             \n`,
				`${WOOD('|||')}             \n`,
				`${WOOD('|||')}			 \n`,
				`${WOOD('|||')}${METAL(' ========= ')}  \n`,
				`${WOOD('|||')}${WOOD('|||||||||||')}`,
			);
			break;
		}
		case 2: {
			console.log(
				` ${METAL(' =========== ')} \n`,
				`${WOOD('|||')}        ${ROPE('|')}    \n`,
				`${WOOD('|||')}       ${SKIN('(xx)')}  \n`,
				`${WOOD('|||')}        ${SKIN('|')}    \n`,
				`${WOOD('|||')}             \n`,
				`${WOOD('|||')}			 \n`,
				`${WOOD('|||')}${METAL(' ========= ')}  \n`,
				`${WOOD('|||')}${WOOD('|||||||||||')}`,
			);
			break;
		}
		case 3: {
			console.log(
				` ${METAL(' =========== ')} \n`,
				`${WOOD('|||')}        ${ROPE('|')}    \n`,
				`${WOOD('|||')}       ${SKIN('(xx)')}  \n`,
				`${WOOD('|||')}       ${SKIN('/|')}    \n`,
				`${WOOD('|||')}             \n`,
				`${WOOD('|||')}			 \n`,
				`${WOOD('|||')}${METAL(' ========= ')}  \n`,
				`${WOOD('|||')}${WOOD('|||||||||||')}`,
			);
			break;
		}
		case 4:
			console.log(
				` ${METAL(' =========== ')} \n`,
				`${WOOD('|||')}        ${ROPE('|')}    \n`,
				`${WOOD('|||')}       ${SKIN('(xx)')}  \n`,
				`${WOOD('|||')}       ${SKIN('/|\\')}  \n`,
				`${WOOD('|||')}             \n`,
				`${WOOD('|||')}			 \n`,
				`${WOOD('|||')}${METAL(' ========= ')}  \n`,
				`${WOOD('|||')}${WOOD('|||||||||||')}`,
			);
			break;
		case 5:
			console.log(
				` ${METAL(' =========== ')} \n`,
				`${WOOD('|||')}        ${ROPE('|')}    \n`,
				`${WOOD('|||')}       ${SKIN('(xx)')}  \n`,
				`${WOOD('|||')}       ${SKIN('/|\\')}  \n`,
				`${WOOD('|||')}       ${PANTS('/')}     \n`,
				`${WOOD('|||')}			 \n`,
				`${WOOD('|||')}${METAL(' ========= ')}  \n`,
				`${WOOD('|||')}${WOOD('|||||||||||')}`,
			);
			break;
		default:
			console.log(
				` ${METAL(' =========== ')} \n`,
				`${WOOD('|||')}        ${ROPE('|')}    \n`,
				`${WOOD('|||')}        ${ROPE('=')}    \n`,
				`${WOOD('|||')}       ${ROPE('(_)')}   \n`,
				`${WOOD('|||')}             \n`,
				`${WOOD('|||')}			 \n`,
				`${WOOD('|||')}${METAL(' ========= ')}  \n`,
				`${WOOD('|||')}${WOOD('|||||||||||')}`,
			);
			break;
	}
}

export { getWords, setFiglet, setHangman };
