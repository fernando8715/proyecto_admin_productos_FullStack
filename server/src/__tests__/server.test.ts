import { connectDB } from "../server";
import db from "../config/db";

jest.mock('../config/db');

describe('connectDB', () => {

    test('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce('Hubo error al intentar conectarse a la base de datos');
        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Hubo error al intentar conectarse a la base de datos'));
    });
});