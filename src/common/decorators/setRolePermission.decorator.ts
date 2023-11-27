import { SetMetadata } from '@nestjs/common'

export const IsTraveler = () => SetMetadata('isTravelerOnly', true)

export const IsAgen = () => SetMetadata('isAgenOnly', true)

export const IsAdmin = () => SetMetadata('isAdminOnly', true)
