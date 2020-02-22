import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'

export default {
	input: 'index.js',
	output: {
		file: 'locomotor-min.js',
		format: 'iife',
		name: 'locomotor',
		sourcemap: true
	},
	plugins: [
		babel({
			babelrc: false
		}),
		resolve()
	]
}