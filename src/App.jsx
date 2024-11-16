import { Form, Field } from 'react-final-form';
import './App.css';

function App() {
  const required = (name) => (value) => value ? undefined : `${name} dibutuhkan`;
  const minLength = (min) => (value) => value && value.length < min ? `Harus lebih dari ${min} karakter` : undefined;
  const composeValidators = (...validators) => (value) =>
    validators.reduce((error, validator) => error || validator(value), undefined);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Form Validation</h1>
        <Form
          onSubmit={(values) => alert(JSON.stringify(values))}
          render={({ handleSubmit, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              <Field name="username" component="input" validate={composeValidators(required('Username'), minLength(5))}>
                {({ input, meta }) => (
                  <div>
                    <input {...input} name="username" className="form-input" placeholder="username" />
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="email" component="input" validate={required('Email')}>
                {({ input, meta }) => (
                  <div>
                    <input {...input} name="email" className="form-input" placeholder="email" />
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <Field name="password" component="input" validate={composeValidators(required('Password'), minLength(8))}>
                {({ input, meta }) => (
                  <div>
                    <input {...input} name="password" className="form-input" type="password" placeholder="password" />
                    {meta.touched && meta.error && <div>{meta.error}</div>}
                  </div>
                )}
              </Field>
              <button type="submit" className="form-submit" disabled={submitting}>Submit!</button>
              <br />
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default App;