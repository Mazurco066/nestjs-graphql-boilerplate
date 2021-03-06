// Dependencies
import { Controller, Get, Res } from '@nestjs/common'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { baseResponse, IBaseResponse } from '../helpers'

// API Version
const pj = readFileSync(resolve(__dirname, '../../package.json'), 'utf-8')
const { version } = JSON.parse(pj)

// App Controller
@Controller()
export class AppController {
  constructor() {}

  // Version api route
  @Get()
  getVersion(@Res() res): IBaseResponse {
    return res.status(200).send(
      baseResponse(200, `Nestjs GraphQL API - version: ${version}`)
    )
  }
}
