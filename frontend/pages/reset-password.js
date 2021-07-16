import ResetPassword from '../containers/ResetPassword';

function ResetPasswordPage({ query }) {
  return (
    <div>
      <ResetPassword token={query?.token} />
    </div>
  );
}

export default ResetPasswordPage;
