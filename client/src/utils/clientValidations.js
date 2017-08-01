function isRequired(value) {
  if (!value || value.length === 0) {
    return 'is required';
  }
}

export default {
  name: [isRequired],
};
