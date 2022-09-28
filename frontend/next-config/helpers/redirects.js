function escapeStringForRegex(str) {
   return str.replace(/[/(){}:*+?]/g, '\\$&');
}

// based on destylizeDeviceItemType() from product-list-helpers
function destylizeURIComponent(uriComponent) {
   return uriComponent.replace(/_+/g, ' ');
}

module.exports = { escapeStringForRegex, destylizeURIComponent };
