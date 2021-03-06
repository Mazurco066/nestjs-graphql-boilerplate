export interface IBaseResponse {
  status: {
    code: number
    message: string
  }
  data: any
}

export default (
  status: number,
  msg: string,
  data: Object | Array<any> | string | undefined = undefined
): IBaseResponse => ({
  status: {
    code: status,
    message: msg
  },
  data: data
})
