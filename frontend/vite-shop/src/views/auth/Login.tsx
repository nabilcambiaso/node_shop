import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import Logo from '../../assets/images/logo.png';
import { loginAction } from '../../logic/redux/actions/auth';
function Login(props: any) {

  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState('');
  const handleClick = () => setShow(!show);

  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  });
  
  const initialValues = {
    email: '',
    password: '',
  };
console.log(props.loginState);
  const onSubmit = async (values: any, onSubmitProps: any) => {
   await props.loginAction(values.email, values.password, (res:any)=>{
       if(res)
       {
        setError('');
        onSubmitProps.resetForm();
       }
       else{
           setError("Email or password inconrrect");
       }

   })
  };
  return (
    <div className="flex min-h-full items-center justify-center py-24 px-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 mt-5">
        <div>
          <img className="mx-auto h-12 w-auto" src={Logo} alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnChange
          validateOnBlur
          validateOnMount
          onSubmit={onSubmit}
        >
          {({ handleBlur, handleChange, handleSubmit, isValid, errors, touched, values }) => {
            const handleData = { handleBlur, handleChange, values };
            return (
              <form className="mt-8 space-y-6"
              //  action="#"
              // method="POST"
              >
                <input type="hidden" name="remember" value="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
                  </div>

                </div>
                <p className='text-red-300'> {errors.password && !errors.email && touched.password && errors.password}</p>
                <p className='text-red-300'> {errors.email && !errors.password && touched.email && errors.email}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
                  </div>
                </div>

                <div>
                  <button type="button" onClick={() => { handleSubmit() }} className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                      </svg>
                    </span>
                    Sign in
                  </button>
                  <p  className="font-medium text-red-600 hover:text-red-300">{error}</p>

                </div>
             
                  
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

const mapStatetoProps = (state: any) => {
  return {
    loginState: state.authReducer,
  }
}
const mapDispatchtoProps = (dispatch: any) => {
  return {
    loginAction: (email: string, password: string, callback: Function) => dispatch(loginAction(email, password, callback)),

  }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Login);
