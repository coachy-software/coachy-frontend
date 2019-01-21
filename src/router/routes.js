import dashboardRoutes from '@/views/dashboard/routes';
import landingRoutes from '@/views/landing/routes';
import loginRoutes from '@/views/login/routes';

export default dashboardRoutes.concat(landingRoutes, loginRoutes);