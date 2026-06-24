export interface FormFieldError {
  field: string;
  error: string;
}

export interface ErrorResponsePayload {
  message: string | FormFieldError[];
}