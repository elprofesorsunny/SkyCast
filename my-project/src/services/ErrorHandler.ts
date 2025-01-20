import axios from "axios";

export default class ErrorHandler {
    static handle(error: unknown): string {
        if (axios.isAxiosError(error)) {
            return error.response?.data?.message || 'Failed to fetch data from the server.';
        }
        if (error instanceof Error) {
            return error.message;
        }
        return 'An unexpected error occurred.';
    }

    static log(error: unknown): void {
        console.error('[ErrorHandler] Logged Error:', error);
    }
}
