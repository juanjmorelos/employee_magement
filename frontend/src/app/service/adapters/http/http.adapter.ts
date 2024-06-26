export abstract class HttpAdapter {
    abstract get<T>(url: string): Promise<T>
    
    abstract post<T>(url: string, json: any, contentType: string): Promise<T>
    
    abstract put<T>(url: string, json: any, contentType: string): Promise<T>
}