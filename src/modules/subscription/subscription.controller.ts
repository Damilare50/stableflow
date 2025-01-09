import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { CreateMailSubscriptionDto } from './dto';

@Controller('subscription')
@ApiTags('subscription')
export class SubscriptionController {
  constructor(private service: SubscriptionService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createMailSubscription(
    @Body() dto: CreateMailSubscriptionDto,
  ): Promise<any> {
    const response = await this.service.saveMailSubscription(dto);

    return {
      statusCode: HttpStatus.OK,
      data: response,
      message: `you've been added to the ${response.type} successfully`,
    };
  }
}
