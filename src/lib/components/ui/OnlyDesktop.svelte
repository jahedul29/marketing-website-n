<!--@docs
The OnlyDesktop node is responsible to show its content on mobile and hide it on desktop.
In order to make gaps work, the OnlyDesktop node is invisible to the layout, letting
its children be direct descendants of its parent.

### Implementation

A single static, display contents/hidden HTMLElement.

### Example

```
<OnlyDesktop>
	<div>OnlyDesktop</div>
</OnlyDesktop>
```
-->
<div class="static hidden bp:contents">
	<slot />
</div>
