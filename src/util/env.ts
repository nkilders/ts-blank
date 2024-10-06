/**
 * This util
 * - uses dotenv to load environment variables from a .env file if present
 * - uses zod to check whether the environment variables comply with the schema described in envSchema
 * - parses the environment variables into the desired data types
 * - returns the parsed environment variables as an object via default export
 */

import dotenv from 'dotenv';
import { object, coerce } from 'zod';
const { number } = coerce;

/**
 * Alternatively to this command you can add `-r dotenv/config` to the
 * start script's command in package.json
 */
dotenv.config();

const envSchema = object({
	SERVER_PORT: number().default(8080),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
	throw new Error('Error while parsing environment variables', {
		cause: parseResult.error,
	});
}

export default parseResult.data;
