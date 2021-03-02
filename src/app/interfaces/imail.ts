export interface IMail {
    EMAIL: [
        id: string,
        sender: string,
        recipient: string, 
        header: string,
        body: string,
        timestamp: string
    ],
    MODE: string
}
