app.controller('alumnoCtrl', ['$scope','$http', '$routeParams', function ($scope,$http,$routeParams) {
	$scope.setActive("mAlumnos");

	var codigo = $routeParams.codigo;
	var url = "";
	$scope.alumno = {};
	$scope.actualizado = false;
	$scope.creando = false;

	if ( codigo == "nuevo"){
		$scope.creando = true;
	} else {
		$http.get('php/servicios/alumnos.getAlumno.php?c='+codigo)
			.success(function(data){
				if(data.err !== undefined ){
					window.location = "#/alumnos";
					return;
				}

				$scope.alumno = data;
			});

	}


	$scope.guardarAlumno = function(){

		if ( $scope.creando ){
			url = 'php/servicios/alumnos.crear.php';
		}
		else
		{
			url = 'php/servicios/alumnos.guardar.php';
		}

		$http.post(url, $scope.alumno).success(function(data){
				if( data.err === false ){
					$scope.actualizado = true;
					setTimeout(function(){
						$scope.actualizado = false;
						$scope.$apply();
					},2500);
				}
			})
	}

}])