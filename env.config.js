const NODE_ENV = process.env.NODE_ENV_OVERRIDE || process.env.NODE_ENV;
const production = !NODE_ENV || NODE_ENV === 'production';

export default {
	node_env: NODE_ENV,
	production
};
