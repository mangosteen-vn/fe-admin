export interface AuthResponse {
  data: {
    access_token: string
    token_type: string
    expires_in: number
  }
}
