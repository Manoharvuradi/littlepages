import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { OrderStatus } from '@prisma/client';

// NestJS Controller endpoints needed:

@Controller('admin')
// @UseGuards(AdminAuthGuard)
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

  // Dashboard
  @Get('dashboard/stats')
  async getDashboardStats() { }

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
  async getOrder(@Param('id') id: string) { }
  
  @Patch('orders/:id')
  async updateOrder(@Param('id') id: string, @Body() data) { }
  
  @Patch('orders/:id/status')
  async updateOrderStatus(@Param('id') id: string, @Body() data) { }
  
  @Get('orders/export')
  async exportOrders(@Query() query) { }

  // Customers
  @Get('customers')
  async getCustomers(@Query() query) { }
  
  @Get('customers/:id')
  async getCustomer(@Param('id') id: number) { }
}
