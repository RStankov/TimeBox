function isRequired(value) {
  if (!value || value.length === 0) {
    return 'is required';
  }
}

function format(regexp, description) {
  return value => {
    if (!value.match(regexp)) {
      return `should match ${description} format.`;
    }
  };
}

const minValue = min => v => parseFloat(v, 10) > min ? null : `should be more than ${ min }`;
const maxValue = max => v => parseFloat(v, 10) < max ? null : `should be less than ${ max }`;

export default {
  date: [isRequired, format(/\d{4}-\d{2}-\d{2}/, '[year]-[month]-[day]')],
  startTime: [isRequired, format(/\d{2}:\d{2}/, '[hour]:[minute]')],
  endTime: [isRequired, format(/\d{2}:\d{2}/, '[hour]:[minute]')],
  billableHours: [minValue(-1)],
};
