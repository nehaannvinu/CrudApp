import { Request, Response } from 'express'
import {
  insufficientParameters,
  mongoError,
  successResponse,
  failureResponse,
} from '../../utils/common/service'
import { IUser } from '../../utils/constants'
import UserService from '../services/service'

import { successMessage, failureMessage } from '../../utils/constants'

export class UserController {
  public emailFormat: RegExp = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
  public phoneNumberFormat: RegExp = new RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
  )
  public genderFormat: RegExp = new RegExp('(Fem|M|fem|m)ale')
  public nameFormat: RegExp = new RegExp(/^[a-zA-Z ]{2,30}$/)

  private user_service: UserService = new UserService()

  public createUser(req: Request, res: Response) {
    try {
      let {
        username,
        name: { first_name, middle_name, last_name },
        email,
        phone_number,
        gender,
      }: {
        username: string
        name: { first_name: string; middle_name: string; last_name: string }
        email: string
        phone_number: string
        gender: string
      } = req.body

      if (
        this.nameFormat.test(first_name) &&
        this.nameFormat.test(middle_name) &&
        this.nameFormat.test(last_name) &&
        email &&
        this.emailFormat.test(email) &&
        phone_number &&
        this.phoneNumberFormat.test(phone_number) &&
        gender &&
        this.genderFormat.test(gender)
      ) {
        const user_params: IUser = {
          username: username,
          name: {
            first_name: first_name,
            middle_name: middle_name,
            last_name: last_name,
          },
          email: email,
          phone_number: phone_number,
          gender: gender,
          modification_details: {
            created_on: new Date(Date.now()),
            modified_on: new Date(Date.now()),
          },
        }
        this.user_service.createUser(
          user_params,
          (err: any, user_data: IUser) => {
            if (err) {
              mongoError(err, res)
            } else {
              successResponse(
                successMessage.userCreationSuccess,
                user_data,
                res,
              )
            }
          },
        )
      } else {
        // error response if some fields are missing in request body
        insufficientParameters(res)
        console.log('insufficientParameters')
      }
    } catch (Errr) {
      console.log('err', Errr)
    }
  }

  public getUsers(req: Request, res: Response) {
    if (Object.keys(req.query).length !== 0) {
      const userFilter = req.query
      this.user_service.findUser(userFilter, (err: any, user_data: IUser) => {
        if (err) {
          mongoError(err, res)
        } else {
          successResponse(successMessage.fetchUserSuccess, user_data, res)
        }
      })
    } else {
      this.user_service.seeAllUsers((err: any, user_data: IUser) => {
        if (err) {
          mongoError(err, res)
        } else {
          successResponse(successMessage.userDisplaySuccess, user_data, res)
        }
      })
    }
  }

  public getUser(req: Request, res: Response) {
    if (req.params.id) {
      const userFilter = { _id: req.params.id }
      this.user_service.findUserOnId(
        userFilter,
        (err: any, user_data: IUser) => {
          if (err) {
            mongoError(err, res)
          } else {
            successResponse(successMessage.fetchUserSuccess, user_data, res)
          }
        },
      )
    } else {
      insufficientParameters(res)
    }
  }

  public updateUser(req: Request, res: Response) {
    let id = req.params.id
    let {
      username,
      name: { first_name, middle_name, last_name },
      email,
      phone_number,
      gender,
    }: {
      username: string
      name: { first_name: string; middle_name: string; last_name: string }
      email: string
      phone_number: string
      gender: string
    } = req.body

    if (
      (id && first_name) ||
      middle_name ||
      last_name ||
      email ||
      phone_number ||
      gender
    ) {
      const userFilter = { _id: id }
      this.user_service.findUserOnId(
        userFilter,
        (err: any, user_data: IUser) => {
          if (err) {
            mongoError(err, res)
          } else if (user_data) {
            const user_params: IUser = {
              _id: id,
              username: username,
              name: req.body.name
                ? {
                    first_name: first_name
                      ? first_name
                      : user_data.name.first_name,
                    middle_name: first_name
                      ? middle_name
                      : user_data.name.middle_name,
                    last_name: last_name ? last_name : last_name,
                  }
                : user_data.name,
              email:
                email && this.emailFormat.test(email) ? email : user_data.email,
              phone_number:
                phone_number && this.phoneNumberFormat.test(phone_number)
                  ? phone_number
                  : user_data.phone_number,
              gender:
                gender && this.genderFormat.test(gender)
                  ? gender
                  : user_data.gender,
              modification_details: {
                created_on: user_data.modification_details.created_on,
                modified_on: new Date(Date.now()),
              },
            }
            this.user_service.updateUser(user_params, (err: any) => {
              if (err) {
                mongoError(err, res)
              } else {
                successResponse(successMessage.userUpdateSuccess, null, res)
              }
            })
          } else {
            failureResponse(failureMessage.invalidUser, null, res)
          }
        },
      )
    } else {
      insufficientParameters(res)
    }
  }

  public deleteUser(req: Request, res: Response) {
    if (req.params.id) {
      this.user_service.deleteUser(
        req.params.id,
        (err: any, delete_details) => {
          if (err) {
            mongoError(err, res)
          } else if (delete_details.deletedCount !== 0) {
            successResponse(successMessage.deleteUserSuccess, null, res)
          } else {
            failureResponse(failureMessage.invalidUser, null, res)
          }
        },
      )
    } else {
      insufficientParameters(res)
    }
  }
}
