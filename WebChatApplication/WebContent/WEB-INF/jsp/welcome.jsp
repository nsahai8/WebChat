<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Web Chat Application</title>
<link rel="shortcut icon"
	href="http://i3.sdlcdn.com/img/icons/favicon.ico" type="image/x-icon" />
<link rel=icon type=image/ico
	href="http://i3.sdlcdn.com/img/icons/favicon.ico" />
<link rel="stylesheet" type="text/css"
	href="WEB-INF/css/libs/jqcloud.min.css">
<link rel="stylesheet" type="text/css"
	href="WEB-INF/css/libs/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="WEB-INF/css/app.css">
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.js"></script>

</head>

<body style="background-color: #aaa">
	<div id="login" class="row" style="margin-top: 10%;">
		<div>
			<div
				style="margin-left: 300px; margin-right: 300px; text-align: center; border: solid #0096ff; background-color: white;">
				<form name="userForm" class="form-signin"
					action="${pageContext.request.contextPath}/login	">
					<div class="form-group"
						ng-class="{ 'has-error' : userForm.username.$invalid && !userForm.username.$pristine }">
						<label for="inputEmail" class="sr-only">Email address</label> <input
							type="email" class="form-control input-lg"
							placeholder="Email address" name="email" ng-model="email">
					</div>

					<div class="form-group" style="margin-top: 45px;">
						<button class="btn btn-lg btn-primary btn-block" type="submit"
							ng-click="loginUser()" style="border-color: #333;">Start
							Chat</button>
					</div>

				</form>
			</div>
		</div>
	</div>
</body>
</html>