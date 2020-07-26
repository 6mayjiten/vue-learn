import Home from '@/components/home/Index';
import Product from '@/components/product/Product';
import Collection from '@/components/collection/Collection';
import NotFound from '@/components/common/NotFound';

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
	},
	{
		path: '*',
		component: NotFound
	}
];
