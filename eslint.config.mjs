import antfu from '@antfu/eslint-config';

export default antfu(
	{
		type: 'app',
		typescript: true,
		formatters: true,
		stylistic: {
			indent: 2,
			semi: true,
			quotes: 'double',
		},
	},
	{
		rules: {
			'ts/no-redeclare': 'off',
			'no-console': ['warn'],
			'antfu/no-top-level-await': ['off'],
			'node/prefer-global/process': ['off'],
			'perfectionist/sort-imports': [
				'error',
				{
					tsconfigRootDir: '.',
				},
			],
			'unicorn/filename-case': [
				'error',
				{
					case: 'kebabCase',
					ignore: ['README.md'],
				},
			],
			'test/prefer-lowercase-title': ['off'],
			'style/no-tabs': 'off',
			'jsonc/indent': 'off',
		},
	}
);
