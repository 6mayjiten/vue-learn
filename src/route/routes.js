import Home from '@/components/home/Index';
import Product from '@/components/product/Index';
import Collection from '@/components/collection/Index';

export default [
	{
		path: '/',
		component: Home
	},
	{
		path: '/collection',
		component: Collection
	},
	{
		path: '/product/:product',
		component: Product
	}
];
