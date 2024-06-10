import plugin from 'tailwindcss/plugin.js';

export default plugin(function ({ addComponents }) {
	addComponents({
		['.WATCHDOG']: {
			outline: 'rgba(50, 20, 10, 50%) 5px solid',
			'outline-offset': '8px',
			position: 'relative',
			/* ensure visibility */
			display: 'block',
			overflow: 'visible'
		},
		['.WATCHDOG-BEFORE']: {
			content: 'watch-dog',
			position: 'absolute',
			outline: 'rgba(50, 20, 10, 50%) 5px solid',
			'outline-offset': '8px',
			top: '50%',
			left: '50%',
			'min-width': '100%',
			'min-height': '100%',
			'background-color': 'rgba(30, 15, 5, 80%)',
			'font-size': '12px',
			'font-weight': 'bold',
			padding: '1.5rem',
			color: 'white',
			overflow: 'hidden',
			'text-overflow': 'ellipsis',
			display: 'flex',
			'flex-direction': 'column',
			'justify-content': 'center',
			'text-align': 'center',
			'z-index': '99999999999',
			transform: 'translate(-50%, -50%)'
		}
	});
});
