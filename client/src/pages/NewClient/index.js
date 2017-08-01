import React from 'react';
import { Header } from 'semantic-ui-react';
import { graphql, gql } from 'react-apollo';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { Form as FormUI, Input, Message } from 'semantic-ui-react';
import _ from 'lodash';

import { Form, createTheme } from 'components/Form';
import paths from 'paths';

const theme = createTheme({
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

function isRequired(value) {
  if (!value || value.length === 0) {
    return 'is required';
  }
}

const validations = {
  name: [isRequired],
};

const fields = {
  name: '',
};

export function Page({ submit, afterSubmit }) {
  return (
    <article>
      <Header as="h1">New Client</Header>
      <Form
        fields={fields}
        validations={validations}
        submit={submit}
        afterSubmit={afterSubmit}
        theme={theme}>
        <Form.Field name="name" />
        <Form.Submit>Create</Form.Submit>
      </Form>
    </article>
  );
}

const MUTATION = gql`
  mutation CreateClient($input: CreateClientInput!) {
    response: createClient(input: $input) {
      node {
        id
        name
      }
      errors {
        field
        messages
      }
    }
  }
`;

export default connect(null, { push })(
  graphql(MUTATION, {
    props: ({ ownProps, mutate }) => ({
      async submit(input) {
        const { data: { response } } = await mutate({
          variables: { input },
        });
        return response;
      },
      afterSubmit(node) {
        ownProps.push(paths.client(node));
      },
    }),
  })(Page),
);
