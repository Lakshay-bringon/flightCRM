// Forget Password API
app.post('/forgetPassword', async (req, res) => {
	try {
		const { email } = req.body;

		// Validate email
		if (!email) {
			return res.status(400).json({
				success: false,
				message: 'Email is required',
			});
		}

		// Email format validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid email format',
			});
		}

		// Check if user exists
		// Add your database logic here to verify if user exists

		// Generate reset token and send email
		// Add your password reset logic here

		res.status(200).json({
			success: true,
			message: 'Password reset link sent to your email',
		});
	} catch (error) {
		// console.error('Forget password error:', error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
});
