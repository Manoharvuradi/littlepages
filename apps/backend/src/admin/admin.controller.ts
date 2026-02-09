import { BadRequestException, Body, Controller, Get, Header, Param, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { OrderStatus } from '@prisma/client';

// NestJS Controller endpoints needed:
class UpdateOrderStatusDto {
  status: OrderStatus;
  note?: string;
}

@Controller('admin')
// @UseGuards(AdminAuthGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

  // Dashboard
  @Get('dashboard/stats')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // Orders
    @Get('orders')
    async getOrders(
    @Query('status') status?: OrderStatus,
    @Query('search') search?: string,
    @Query('fromDate') fromDate?: string,
    @Query('toDate') toDate?: string,
    ) {
    return this.adminService.getOrders({
        status,
        search,
        fromDate,
        toDate,
    });
    }
  
  @Get('orders/:id')
  async getOrder(@Param('id') id: string) {
    return this.adminService.getOrder(id);
  }
  
  @Patch('orders/:id')
  async updateOrder(@Param('id') id: string, @Body() data) { }
  
@Patch('orders/:id/status')
  async updateOrderStatus(
    @Param('id') id: string, 
    @Body() data: UpdateOrderStatusDto
  ) {
    const { status, note } = data;

    // Validate status
    const validStatuses: OrderStatus[] = [
      'CONFIRMED',
      'PROCESSING',
      'SHIPPED',
      'DELIVERED',
      'CANCELLED',
      'REFUNDED',
    ];

    if (!validStatuses.includes(status)) {
      throw new BadRequestException(
        `Invalid status. Must be one of: ${validStatuses.join(', ')}`
      );
    }

    return this.adminService.updateOrderStatus(id, status, note);
  }

  
  @Get('orders/export')
  @Header('Content-Type', 'text/csv')
  @Header(
    'Content-Disposition',
    `attachment; filename="orders-${Date.now()}.csv"`
  )
async exportOrders(
  @Query('status') status?: OrderStatus,
  @Query('fromDate') fromDate?: string,
  @Query('toDate') toDate?: string,
) {
  return this.adminService.exportOrders({
    status,
    fromDate,
    toDate,
  });
}

  // Customers
    @Get('customers')
  async getAllCustomers(
    @Query('search') search?: string,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.adminService.getAllCustomers({
      search,
      page: Number(page),
      limit: Number(limit),
    });
  }
  
  @Get('customers/:id')
  async getCustomer(@Param('id') id: number) { }
}
