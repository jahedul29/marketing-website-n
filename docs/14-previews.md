# Previews

Craft CMS offers the ability to preview entries with unpublished changes, even in headless mode.

To make this work, you just need to set the `@host` alias in the `general.php` config file of the
Craft project.

```php
// Host aliases exemples
'dev' => [
	'devMode' => true,
	'aliases' => [
		'@host' => 'http://localhost:3000',
	]
],
'production' => [
	'aliases' => [
		'@host' => 'https://<MY-PROJECT>.com',
	]
]
```
