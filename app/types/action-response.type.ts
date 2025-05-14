export type ActionResponse =
    | {
        fieldErrors?: Record<string, string> | null;
        message?: string;
        success: boolean;
        details?: string;
    }
    | undefined;