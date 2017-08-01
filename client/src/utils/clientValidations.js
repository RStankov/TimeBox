function isRequired(value) {
  if (!value || value.length === 0) {
    return 'is required';
  }
}

const minValue = min => v => parseFloat(v, 10) > min ? null : `should be more than ${ min }`;

export default {
  name: [isRequired],
  hourlyRate: [isRequired, minValue(-1)],
};
