<!--@docs
The ScrollX node is responsible to capture the user's horizontal scroll intent.
Its creates a context where overflowing content will be hidden.

### Implementation

A single static, display overflow-x-scroll HTMLElement.

### Example

```
<ScrollX>
	<FlowX>
		<div class="min-w-[600px]">ScrollX</div>
		<div class="min-w-[600px]">ScrollX</div>
		<div class="min-w-[600px]">ScrollX</div>
	</FlowX>
</ScrollX>
```
-->
<div class="min-w-0 max-w-full overflow-x-scroll">
	<slot />
</div>
