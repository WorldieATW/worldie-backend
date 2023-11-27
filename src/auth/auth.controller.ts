import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDTO, RegistrationDTO } from './auth.DTO'
import { ResponseUtil } from 'src/common/utils/response.util'
import { IsPublic } from 'src/common/decorators/isPublic.decorator'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly responseUtil: ResponseUtil
  ) {}

  @IsPublic()
  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  async registration(@Body() body: RegistrationDTO) {
    const responseData = await this.authService.registration(body)

    return this.responseUtil.response(
      {
        responseCode: HttpStatus.CREATED,
        responseMessage: 'User successfully registered',
      },
      responseData
    )
  }

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDTO) {
    const responseData = await this.authService.login(body)

    return this.responseUtil.response(
      {
        responseMessage: 'Login Successful',
      },
      responseData
    )
  }
}
