<!--@docs
The OnlyMobile node is responsible to show its content on mobile and hide it on desktop.
In order to make gaps work, the OnlyMobile node is invisible to the layout, letting
its children be direct descendants of its parent.

### Implementation

A single static, display contents/hidden HTMLElement.

### Example

```
<OnlyMobile>
	<div>OnlyMobile</div>
</OnlyMobile>
```
-->
<div class="static contents bp:hidden">
	<slot />
</div>
