/* eslint-disable no-case-declarations */
// supabaseErrorHandler.ts
import { PostgrestError } from '@supabase/supabase-js';

/**
 * Options for error handling
 */
interface ErrorHandlingOptions {
    /** The name of the table being operated on (for error messages) */
    tableName?: string;
    /** Whether to log errors to the console */
    logToConsole?: boolean;
    /** Whether to include detailed error information in the response */
    includeDetails?: boolean;
    /** Custom error messages to override defaults */
    customMessages?: Record<string, string>;
}

/**
 * The response from the error handler
 */
interface ErrorResponse {
    /** User-friendly error message */
    error: string;
    /** Detailed error information (if includeDetails is true) */
    details?: string;
}

/**
 * The response from an operation with error handling
 */
interface OperationResponse<T> {
    /** The data returned from the operation (if successful) */
    data: T | null;
    /** Error message (if operation failed) */
    error: string | null;
    /** Detailed error information (if includeDetails is true) */
    details?: string;
    /** Status code of the response (from Supabase) */
    status?: number;
    /** Status text of the response (from Supabase) */
    statusText?: string;
    /** Whether the error was caught as an exception (not from Supabase) */
    caught?: boolean;
    /** Any other properties returned by the operation */
    [key: string]: any;
}

/**
 * Utility to handle common Supabase errors and return user-friendly messages
 * @param error - The error object from Supabase
 * @param options - Options to customize error handling
 * @returns An object with error message and optional details
 */
export const handleSupabaseError = (
    error: PostgrestError | Error | unknown,
    options: ErrorHandlingOptions = {}
): ErrorResponse => {
    // Default options
    const defaultOptions: ErrorHandlingOptions = {
        tableName: 'record', // Generic name if not specified
        logToConsole: true,
        includeDetails: process.env.NODE_ENV === 'development', // Only in dev
        customMessages: {}, // For overriding default messages
    };

    const config = { ...defaultOptions, ...options };
    const { tableName, logToConsole, includeDetails, customMessages = {} } = config;

    // Log the full error to console if enabled
    if (logToConsole) {
        console.error('Supabase error:', error);
    }

    // Default response
    const response: ErrorResponse = {
        error: 'An unexpected error occurred',
        details: includeDetails ? JSON.stringify(error, null, 2) : undefined,
    };

    // No error object provided
    if (!error) {
        return response;
    }

    // Handling PostgrestError (from Supabase)
    if (typeof error === 'object' && error !== null) {
        // Cast to any to check for code property safely
        const anyError = error as any;
        const errorCode: string | undefined = anyError.code;
        const errorMessage: string | undefined = anyError.message;

        if (!errorCode && !errorMessage) {
            return response;
        }

        // Code-based error handling
        switch (errorCode) {
            // Authentication and permissions
            case '42501':
                response.error = customMessages['42501'] ||
                    `Permission denied. Check Row Level Security policies for the ${tableName} table.`;
                break;

            case '28000':
                response.error = customMessages['28000'] ||
                    'Invalid credentials. Please check your username and password.';
                break;

            case '28P01':
                response.error = customMessages['28P01'] ||
                    'Incorrect password.';
                break;

            // Resource not found
            case '42P01':
                response.error = customMessages['42P01'] ||
                    `Table "${tableName}" not found. Check if it exists in your database.`;
                break;

            case '42703':
                response.error = customMessages['42703'] ||
                    'Column not found. Check your field names.';
                break;

            // Constraint violations
            case '23505':
                // Try to extract the constraint name for more specific message
                const constraintMatch = errorMessage?.match(/violates unique constraint "(.+?)"/);
                const constraint = constraintMatch ? constraintMatch[1] : '';

                // Provide specific messages based on common constraint names
                if (constraint.includes('email')) {
                    response.error = 'A user with this email already exists.';
                } else if (constraint.includes('username')) {
                    response.error = 'This username is already taken.';
                } else {
                    response.error = customMessages['23505'] ||
                        `This ${tableName} already exists.`;
                }
                break;

            case '23503':
                response.error = customMessages['23503'] ||
                    'This operation would violate a foreign key constraint.';
                break;

            case '23502':
                const nullFieldMatch = errorMessage?.match(/null value in column "(.+?)"/);
                const nullField = nullFieldMatch ? nullFieldMatch[1] : 'a required field';

                response.error = customMessages['23502'] ||
                    `Missing required field: ${nullField}.`;
                break;

            // Connection issues
            case '08001':
            case '08006':
            case '08004':
                response.error = customMessages['connection'] ||
                    'Connection to the database failed. Please try again later.';
                break;

            // Transaction errors
            case '40001':
                response.error = customMessages['40001'] ||
                    'Database conflict error. Please try again.';
                break;

            // If we have a message but no code we recognize
            default:
                if (errorMessage) {
                    response.error = errorMessage;
                }
                break;
        }
    } else if (error instanceof Error) {
        // Handle standard JavaScript errors
        response.error = error.message;
    }

    return response;
};

/**
 * Utility for wrapping Supabase operations with error handling
 * @param operation - The Supabase operation to perform
 * @param options - Options for error handling
 * @returns Result of the operation with error handling
 */
export const withErrorHandling = async <T>(
    operation: () => Promise<{
        data: T | null;
        error: PostgrestError | null;
        [key: string]: any;
    }>,
    options: ErrorHandlingOptions = {}
): Promise<OperationResponse<T>> => {
    try {
        const { data, error, ...rest } = await operation();

        if (error) {
            const errorResponse = handleSupabaseError(error, options);
            return {
                data: null,
                error: errorResponse.error,
                details: errorResponse.details,
                ...rest
            };
        }

        return { data, error: null, ...rest };
    } catch (err) {
        const errorResponse = handleSupabaseError(err, options);
        return {
            data: null,
            error: errorResponse.error,
            details: errorResponse.details,
            caught: true // Indicate this was a caught exception
        };
    }
};

