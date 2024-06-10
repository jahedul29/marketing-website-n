<!--@docs
The ScrollY node is responsible to capture the user's vertical scroll intent.
Its creates a context where overflowing content will be hidden.

### Implementation

A single static, display overflow-y-scroll HTMLElement.

### Example

```
<Building height="288">
	<ScrollY>
		<div class="min-h-[600px]">ScrollY</div>
		<div class="min-h-[600px]">ScrollY</div>
		<div class="min-h-[600px]">ScrollY</div>
	</ScrollY>
</Building>
```
-->
<div class="max-h-full min-h-0 min-w-0 max-w-full overflow-y-scroll">
	<slot />
</div>
