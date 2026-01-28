class ApiError extends Error {
    status: number

    constructor(status: number, message: string) {
        super(message)
        this.status = status
        this.name = "ApiError"
    }
}

class ApiClient {
    private baseUrl: string

    constructor(
        baseUrl: string = `${import.meta.env.VITE_URL}/api`
    ) {
        this.baseUrl = baseUrl
    }

    private async request<T>(
        endpoint: string,
        options?: RequestInit
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`
        const config: RequestInit = {...options,
            headers: {
                "Content-type": "application/json",
                ...options?.headers
            }
        }
        try {
            const response = await fetch(url, config)

            if (!response.ok) {
                const errorData = 
                    await response.json().catch(() => ({}))
                throw new ApiError(
                    response.status,
                    errorData.error ||
                    `HTTP ${response.status}: ${response.statusText}`
                )
            }
            
            return await response.json()
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw new ApiError(
                0, 
                `Network error: ${error instanceof Error ? error.message :
                    'Unknown error'
                }`)
        }
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>
    }
}

export const apiClient = new ApiClient()
