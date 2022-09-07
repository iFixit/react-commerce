function escapeStringForRegex(str) {
   return str.replace(/[/(){}:*+?]/g, '\\$&');
}

module.exports = { escapeStringForRegex };
