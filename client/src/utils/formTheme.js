import React from 'react';
import { Form as FormUI, Input, Message } from 'semantic-ui-react';
import _ from 'lodash';

import { createTheme } from 'components/Form';

export default createTheme({
  inputs: {
    textarea: FormUI.Textarea,
    select: FormUI.Select,
    text: Input,
  },

  renderField({ name, label, input, error, isValidating, isFocus, props }) {
    return (
      <FormUI.Field inline>
        <label htmlFor={name}>
          {_.capitalize(label)}
        </label>
        {input}
        {error && <Message error content={error} />}
      </FormUI.Field>
    );
  },

  renderSubmit({ isSubmitting, props: { children, ...otherProps } }) {
    return (
      <input
        {...otherProps}
        type="submit"
        value={isSubmitting ? 'Submitting...' : children}
        disabled={isSubmitting}
      />
    );
  },
});
