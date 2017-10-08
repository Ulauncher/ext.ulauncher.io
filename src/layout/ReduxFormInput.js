import React from 'react'
import { FormGroup, HelpBlock, ControlLabel, FormControl } from 'react-bootstrap'
import { Field } from 'redux-form'

export const BootstrapFormInput = ({ input, label, value, meta, onChange }) => (
  <FormGroup validationState={meta.error && 'error'}>
    <ControlLabel className="col-sm-2">{label}</ControlLabel>
    <div className="col-sm-10">
      <FormControl type="text" value={input.value} onChange={input.onChange} />
      <FormControl.Feedback />
      <HelpBlock>{meta.error}</HelpBlock>
    </div>
  </FormGroup>
)

const FormInput = props => <Field component={BootstrapFormInput} {...props} />
export default FormInput
