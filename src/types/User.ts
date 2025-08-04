export interface UserInfo {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  profilePic?: string
  token?: string
}

export interface UserUpdatePayload {
  name?: string
  email?: string
  password?: string
  isAdmin?: boolean
  profilePic?: string
}
