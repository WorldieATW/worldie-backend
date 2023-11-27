import { SetMetadata } from '@nestjs/common'

export const Traveler = () => SetMetadata('isTravelerOnly', true)

export const Agen = () => SetMetadata('isAgenOnly', true)

export const Admin = () => SetMetadata('isAdminOnly', true)
