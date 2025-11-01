declare module "@vercel/node" {
  export interface VercelRequest {
    method?: string;
    body?: unknown;
    query: {
      [key: string]: string | string[] | undefined;
    };
  }

  export interface VercelResponse {
    status: (statusCode: number) => VercelResponse;
    json: (body: unknown) => VercelResponse;
    setHeader: (name: string, value: string) => void;
  }
}
