<!--@docs
The Prose node is responsible for the visual style of basic html elements (markdown).
In order to make gaps work, the Prose node is invisible to the layout, letting
its children be direct descendants of its parent.

### Implementation

A single static, display contents HTMLElement.

### Example

```
<Prose>
	<h2>h2 title</h2>
	<h3>h3 title</h3>
	<p>paragraph</p>
</Prose>
```
-->
<div class="_prose static contents min-w-0 max-w-full">
	<slot />
</div>
