import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: 'https://cms.planned.com/api/',
	generates: {
		'./src/craft.d.ts': {
			plugins: ['typescript']
		}
	}
};
export default config;

//  This is an example config to get a specific (not public) schema.
//  Edit the target file name, the schema url and get a graphql token from craft tied
//  to the schema you want to export. The name of the file must start with `craft-`
//  and must end with `.d.ts`.

//  const config: CodegenConfig = {
// 		schema: [
// 			{
// 				'https://cms.planned.com/api/': {
// 					headers: {
// 						Authorization: 'YOUR TOKEN HERE',
// 					},
// 				},
// 			},
// 		],
// 		generates: {
// 			'./src/craft-other-schema.d.ts': {
// 				plugins: ['typescript']
// 			}
// 		}
//  };

//  ###### IMPORTANT ######
//  The token must also be passed in the headers param of loadCraftPage called for data in the custom schema.
//  Without the token, loadCraftPage will use the public schema.

//  ###### IMPORTANT ######
//  The following configuration must also be added to the .htaccess.dev file for the headers to work

//  ## Force Apache to pass down Authorization header
//  CGIPassAuth On
