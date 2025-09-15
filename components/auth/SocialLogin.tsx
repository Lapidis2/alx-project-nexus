const SocialLogin = () => {
	const googleAuthUrl = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL;
  
	return (
	  <div className="flex flex-col gap-3">
		<button
		  onClick={() => (window.location.href = googleAuthUrl || "")}
		  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-blue-900"
		>
		  Continue with Google
		</button>
	  </div>
	);
  };
  
  export default SocialLogin
  