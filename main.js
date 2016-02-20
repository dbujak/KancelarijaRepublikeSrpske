angular.module('project', ['ngRoute', 'firebase'])


.service('Projects', function($q, $firebase, fbRef, fbAuth, projectListValue) {
  var self = this;
})

.config(function($routeProvider) {

  $routeProvider
    .when('/', {
      controller:'SiteController',
      templateUrl:'views/home.html'
    })
    .when('/edit/:projectId', {
      controller:'EditProjectController as editProject',
      templateUrl:'detail.html'
    })
    .when('/new', {
      controller:'NewProjectController as editProject',
      templateUrl:'detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('SiteController', function() {
})

.controller('NewProjectController', function($location, projects) {
  var editProject = this;
  editProject.save = function() {
      projects.$add(editProject.project).then(function(data) {
          $location.path('/');
      });
  };
})

.controller('EditProjectController',
  function($location, $routeParams, projects) {
    var editProject = this;
    var projectId = $routeParams.projectId,
        projectIndex;

    editProject.projects = projects;
    projectIndex = editProject.projects.$indexFor(projectId);
    editProject.project = editProject.projects[projectIndex];

    editProject.destroy = function() {
        editProject.projects.$remove(editProject.project).then(function(data) {
            $location.path('/');
        });
    };

    editProject.save = function() {
        editProject.projects.$save(editProject.project).then(function(data) {
           $location.path('/');
        });
    };
});

