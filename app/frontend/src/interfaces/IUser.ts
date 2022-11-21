export interface IPayloadUser {
  username: string
  password: string
}

export interface IUser {
  id: string
  username: string
  password: string
  accountId: string
}

export interface IUserToken {
  token: string
  user: IUser
}
