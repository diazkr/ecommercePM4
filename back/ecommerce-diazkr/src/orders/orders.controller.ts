import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { orderdDto } from '../Dto/oder.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Rol } from 'src/auth/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {

    constructor(private readonly orderService: OrdersService){}

    @ApiBearerAuth()
    @Get(':id')
    @Roles(Rol.User)
    @UseGuards(AuthGuard)
    getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return this.orderService.getOrder(id);
    }

    @ApiBearerAuth()
    @Post()
    @Roles(Rol.User)
    @UseGuards(AuthGuard)
    addOrder(@Body() orderData: orderdDto){
        return this.orderService.addOrder(orderData)
    }
}
